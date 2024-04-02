
import * as anchor from "@coral-xyz/anchor";
import * as web3 from '@solana/web3.js'

import { useProgram } from "./useProgram";
import { useCommonDataProvider } from "../context/CommonDataContextProvider";
import { useCallback, useEffect, useState } from "react";
import { parseUnits } from "../utils";
import { RAY, Token, USDC } from "../config";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token";
import {
    ammInfo,
    ammAuthorityInfo,
    ammOpenOrderInfo,
    ammTargetOrdersInfo,
    ammCoinVaultInfo,
    ammPcVaultInfo,
    serumProgram,
    marketInfo,
    marketBidsInfo,
    marketAsksInfo,
    marketEventQueueInfo,
    marketCoinVaultInfo,
    marketPcVaultInfo,
    marketVaultSigner,
    raydiumAmmProgram,
} from "../config";
import { formatAmmKeysById } from "../utils/CalculateAmountIn";
import { Liquidity, LiquidityPoolInfo, LiquidityPoolKeys, jsonInfo2PoolKeys } from "@raydium-io/raydium-sdk";
import BigNumber from "bignumber.js";
import { DECIMALS } from "../config/number";
// import useRefresh from "./useRefersh";

export enum PositionType {
    LONG,
    SHORT
}

export type Postion = {
    borrowAmount: string
    borrowFeeRate: number
    bump: number
    openAt: string
    userAmount: string
}

export const useTrade = () => {
    const [loading, setLoading] = useState(false);
    const program = useProgram();
    const { publicKey, sendTransaction } = useWallet();
    const [poolKeys, setPoolKeys] = useState<LiquidityPoolKeys>();
    const [poolInfo, setPoolInfo] = useState<LiquidityPoolInfo>();
    const [longPosition, setLongPosition] = useState<Postion>();
    const [shortPosition, setShortPosition] = useState<Postion>();
    const [longBalances, setLongBalances] = useState<{symbol: string, value: string}[]>([
        { symbol: 'RAY', value: '' },
        { symbol: 'USDC', value: '' },
    ]);
    const [shortBalances, seShortBalances] = useState<{symbol: string, value: string}[]>([
        { symbol: 'RAY', value: '' },
        { symbol: 'USDC', value: '' },
    ]);

    const { connection } = useConnection();
    const {
        globalConfigAccount,
        userPositionAccountForRay,
        userPositionAccountForUSDC,
        userPositionForRayTokenAccountForRay,
        userPositionForRayTokenAccountForUSDC,
        userPositionForUSDCTokenAccountForUSDC,
        userPositionForUSDCTokenAccountForRay,
        userTokenAccountForRay,
        userTokenAccountForUSDC,
        poolAccountForRay,
        poolAccountForUSDC,
        poolTokenAccountForRay,
        poolTokenAccountForUSDC,

    } = useCommonDataProvider()


    const fetchUserPositionInfo = async () => {
        if (program && userPositionAccountForRay !== undefined && userPositionAccountForUSDC !== undefined) {
            try {
                const userPositionLongInfo = await program.account.userPositionInfo.fetch(userPositionAccountForUSDC);
                setLongPosition({
                    borrowAmount: userPositionLongInfo.userAmount.toNumber(),
                    borrowFeeRate: userPositionLongInfo.borrowFeeRate,
                    bump: userPositionLongInfo.bump,
                    openAt: userPositionLongInfo.openAt,
                    userAmount: userPositionLongInfo.userAmount.toNumber(),
                })
            } catch (error) {
                console.log("error", error)
            }
            try {
                const userPositionShortInfo = await program.account.userPositionInfo.fetch(userPositionAccountForRay);
                setLongPosition({
                    borrowAmount: userPositionShortInfo.userAmount.toNumber(),
                    borrowFeeRate: userPositionShortInfo.borrowFeeRate,
                    bump: userPositionShortInfo.bump,
                    openAt: userPositionShortInfo.openAt,
                    userAmount: userPositionShortInfo.userAmount.toNumber(),
                })
                // setShortPosition(userPositionShortInfo.userAmount.toNumber())
            } catch (error) {
                console.log("error", error)
            }
        }
    }

    const fetchInfo = useCallback(async () => {
        const targetPool = "A9z2G1UCHJYukBJAdpWd4WrVw4NMXR7ca7Jx3jtETW3W";
        const targetPoolInfo = await formatAmmKeysById(connection, targetPool);
        const poolKeys = jsonInfo2PoolKeys(targetPoolInfo) as LiquidityPoolKeys;
        const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });
        setPoolInfo(poolInfo);
        setPoolKeys(poolKeys);
    }, [connection])

    async function fetchPostionBalanceInfo() {
        try {
            if (!publicKey || !connection || !userPositionForUSDCTokenAccountForRay ||
                !userPositionForUSDCTokenAccountForUSDC || !userPositionForRayTokenAccountForRay ||
                !userPositionForRayTokenAccountForUSDC
            ) return

            let rayBalanceLong, usdcBalanceLong, rayBalanceShort, usdcBalanceShort

            try {
                 rayBalanceLong = await getAccount(
                    connection,
                    userPositionForUSDCTokenAccountForRay,
                    undefined,
                    TOKEN_PROGRAM_ID,
                );
            } catch (error) {}
            try {
                usdcBalanceLong = await getAccount(
                    connection,
                    userPositionForUSDCTokenAccountForUSDC,
                    undefined,
                    TOKEN_PROGRAM_ID,
                )
            } catch (error) {}
            setLongBalances([
                { symbol: 'RAY', value: rayBalanceLong ? new BigNumber(rayBalanceLong.amount.toString()).div(DECIMALS).toString() : '0' },
                { symbol: 'USDC', value: usdcBalanceLong ? new BigNumber(usdcBalanceLong.amount.toString()).div(DECIMALS).toString() : '0' },
            ]);

            try {
                rayBalanceShort = await getAccount(
                    connection,
                    userPositionForRayTokenAccountForRay,
                    undefined,
                    TOKEN_PROGRAM_ID,
                );

            } catch (error) {}

            try {
                usdcBalanceShort = await getAccount(
                    connection,
                    userPositionForRayTokenAccountForUSDC,
                    undefined,
                    TOKEN_PROGRAM_ID,
                )
            } catch (error) {}

            seShortBalances([
                { symbol: 'RAY', value: rayBalanceShort ? new BigNumber(rayBalanceShort.amount.toString()).div(DECIMALS).toString() : '0' },
                { symbol: 'USDC', value: usdcBalanceShort ? new BigNumber(usdcBalanceShort.amount.toString()).div(DECIMALS).toString() : '0' },
            ]);

        } catch (error) {
            console.log("error", error)
        }
    }

    const openPostion = useCallback(async (positionAmount: string, borrowAmount: string, postionType: PositionType) => {
        if (!program || !publicKey) return
        const token: Token = postionType === PositionType.LONG ? USDC : RAY;
        const openPositionParams = {
            userAmount: new anchor.BN(parseUnits(positionAmount, token.decimals)),
            borrowAmount: new anchor.BN(parseUnits(borrowAmount, token.decimals)),
        };
        const instruction = await program.methods.openPosition(
            openPositionParams
        ).accounts({
            user: publicKey,
            tokenMint: postionType === PositionType.LONG ? USDC.mint : RAY.mint,
            userPositionInfo: postionType === PositionType.LONG ? userPositionAccountForUSDC : userPositionAccountForRay,
            userPositionTokenAccount: postionType === PositionType.LONG ? userPositionForUSDCTokenAccountForUSDC : userPositionForRayTokenAccountForRay,
            userTokenAccount: postionType === PositionType.LONG ? userTokenAccountForUSDC : userTokenAccountForRay,
            poolInfo: postionType === PositionType.LONG ? poolAccountForUSDC : poolAccountForRay,
            poolTokenAccount: postionType === PositionType.LONG ? poolTokenAccountForUSDC : poolTokenAccountForRay,
        }).signers([]).instruction();

        let swapParams = {
            amountIn: new anchor.BN(parseUnits(new BigNumber(positionAmount).plus(new BigNumber(borrowAmount).times(new BigNumber(1).minus('0.00001'))).toString(), 6)),
            minimumAmountOut: new anchor.BN(0),
        }
        let instruction2 = await program.methods.swapBaseIn(
            swapParams
        ).accounts({
            ammInfo,
            ammAuthorityInfo,
            ammOpenOrderInfo,
            ammTargetOrdersInfo,
            ammCoinVaultInfo,
            ammPcVaultInfo,
            serumProgram,
            marketInfo,
            marketBidsInfo,
            marketAsksInfo,
            marketEventQueueInfo,
            marketCoinVaultInfo,
            marketPcVaultInfo,
            marketVaultSigner,
            raydiumAmmProgram,
            user: publicKey,
            globalConfigInfo: globalConfigAccount,
            poolInfo: postionType === PositionType.LONG ? poolAccountForUSDC : poolAccountForRay,
            userPositionInfo: postionType === PositionType.LONG ? userPositionAccountForUSDC : userPositionAccountForRay,
            userPositionInTokenAccount: postionType === PositionType.LONG ? userPositionForUSDCTokenAccountForUSDC : userPositionForUSDCTokenAccountForRay,
            userPositionOutTokenAccount: postionType === PositionType.LONG ? userPositionForUSDCTokenAccountForRay : userPositionForUSDCTokenAccountForUSDC,
            coinTokenMint: USDC.mint,
            pcTokenMint: RAY.mint,
        }).signers([]).instruction();

        const transaction = new web3.Transaction();
        transaction.add(instruction);
        transaction.add(instruction2);

        try {
            setLoading(true)
            sendTransaction(transaction, connection, {skipPreflight: true}).then(sig => {
                setLoading(false)
                console.log(sig)
            })
        } catch (error) {
            setLoading(false)
        }
    }, [publicKey, program]);

    const closePosition = useCallback(async (positionType: PositionType) => {
        if (!program || !publicKey) return
        console.log("positionType === PositionType.LONG ? userPositionForUSDCTokenAccountForUSDC : userPositionForUSDCTokenAccountForRay", positionType === PositionType.LONG ? userPositionForUSDCTokenAccountForUSDC?.toString() : userPositionForUSDCTokenAccountForRay?.toString())
        const instruction = await program.methods.closePosition().accounts({
            user: publicKey,
            tokenMint: positionType === PositionType.LONG ? USDC.mint : RAY.mint,
            userPositionInfo: positionType === PositionType.LONG ? userPositionAccountForUSDC : userPositionAccountForRay,
            userPositionTokenAccount: positionType === PositionType.LONG ? userPositionForUSDCTokenAccountForUSDC : userPositionForUSDCTokenAccountForRay,
            userTokenAccount: positionType === PositionType.LONG ? userTokenAccountForUSDC : userTokenAccountForRay,
            poolInfo: positionType === PositionType.LONG ? poolAccountForUSDC : poolAccountForRay,
            poolTokenAccount: positionType === PositionType.LONG ? poolTokenAccountForUSDC : poolTokenAccountForRay,
        }).signers([]).instruction();
        const transaction = new web3.Transaction();
        transaction.add(instruction)
        try {
            setLoading(true)
            sendTransaction(transaction, connection, {skipPreflight: true}).then(sig => {
                setLoading(false)
                console.log(sig)
            })
        } catch (error) {
            setLoading(false)
        }
    }, [publicKey, program]);

    const swapBaseIn = useCallback(async (amountIn: string, symbol: string, postionType: PositionType) => {
        if (!publicKey || !program || !userPositionForUSDCTokenAccountForUSDC) return;
        //USDC -> RAY input USDC amount
        // let userTokenAccountInfo = await getAccount(connection, userPositionForUSDCTokenAccountForUSDC, undefined, TOKEN_PROGRAM_ID);
        // let amountIn = userTokenAccountInfo.amount;
        const swapParams = {
            amountIn: new anchor.BN(parseUnits(amountIn, 6)),
            minimumAmountOut: new anchor.BN(0),
        }
        let userPositionInTokenAccount;
        let userPositionOutTokenAccount;
        if (postionType === PositionType.LONG) {
            if (symbol === 'USDC') {
                userPositionInTokenAccount = userPositionForUSDCTokenAccountForUSDC;
                userPositionOutTokenAccount = userPositionForUSDCTokenAccountForRay;
            } else {
                userPositionInTokenAccount = userPositionForUSDCTokenAccountForRay;
                userPositionOutTokenAccount = userPositionForUSDCTokenAccountForUSDC
            }
        } else {
            if (symbol === 'USDC') {
                userPositionInTokenAccount = userPositionForRayTokenAccountForUSDC;
                userPositionOutTokenAccount = userPositionForRayTokenAccountForRay;
            } else {
                userPositionInTokenAccount = userPositionForRayTokenAccountForRay;
                userPositionOutTokenAccount = userPositionForRayTokenAccountForUSDC
            }
        }
        try {
            const instruction = await program.methods.swapBaseIn(
                swapParams
            ).accounts({
                ammInfo,
                ammAuthorityInfo,
                ammOpenOrderInfo,
                ammTargetOrdersInfo,
                ammCoinVaultInfo,
                ammPcVaultInfo,
                serumProgram,
                marketInfo,
                marketBidsInfo,
                marketAsksInfo,
                marketEventQueueInfo,
                marketCoinVaultInfo,
                marketPcVaultInfo,
                marketVaultSigner,
                raydiumAmmProgram,
                user: publicKey,
                globalConfigInfo: globalConfigAccount,
                poolInfo: postionType === PositionType.LONG ? poolAccountForUSDC : poolAccountForRay,
                userPositionInfo: postionType === PositionType.LONG ? userPositionAccountForUSDC : userPositionAccountForRay,
                userPositionInTokenAccount,
                userPositionOutTokenAccount,
                coinTokenMint: symbol === 'USDC' ? USDC.mint : RAY.mint,
                pcTokenMint: symbol === 'USDC' ? RAY.mint : USDC.mint,
            }).signers([]).instruction();
            const transaction = new web3.Transaction();
            transaction.add(instruction)
            setLoading(true)
            sendTransaction(transaction, connection, {skipPreflight: true}).then(sig => {
                setLoading(false)
                console.log(sig)
            })
        } catch (error) {
            console.log("SwapIn-error",error)
            setLoading(false)
        }
    }, [publicKey, program]);

    const swapBaseOut = useCallback(async (maxAmountIn: string, amountOut: string, symbol: string, postionType: PositionType) => {
        if (!publicKey || !program || !userPositionForUSDCTokenAccountForUSDC) return;
        //USDC -> RAY, input RAY amount
        let swapParams = {
            maxAmountIn: new anchor.BN(parseUnits(maxAmountIn, 6)),
            amountOut: new anchor.BN(parseUnits(amountOut, 6)),
        }
        let userPositionInTokenAccount;
        let userPositionOutTokenAccount;
        if (postionType === PositionType.LONG) {
            if (symbol === 'USDC') {
                userPositionInTokenAccount = userPositionForUSDCTokenAccountForUSDC;
                userPositionOutTokenAccount = userPositionForUSDCTokenAccountForRay;
            } else {
                userPositionInTokenAccount = userPositionForUSDCTokenAccountForRay;
                userPositionOutTokenAccount = userPositionForUSDCTokenAccountForUSDC
            }
        } else {
            if (symbol === 'USDC') {
                userPositionInTokenAccount = userPositionForRayTokenAccountForUSDC;
                userPositionOutTokenAccount = userPositionForRayTokenAccountForRay;
            } else {
                userPositionInTokenAccount = userPositionForRayTokenAccountForRay;
                userPositionOutTokenAccount = userPositionForRayTokenAccountForUSDC
            }
        }
        const instruction = await program.methods.swapBaseOut(
            swapParams
        ).accounts({
            ammInfo,
            ammAuthorityInfo,
            ammOpenOrderInfo,
            ammTargetOrdersInfo,
            ammCoinVaultInfo,
            ammPcVaultInfo,
            serumProgram,
            marketInfo,
            marketBidsInfo,
            marketAsksInfo,
            marketEventQueueInfo,
            marketCoinVaultInfo,
            marketPcVaultInfo,
            marketVaultSigner,
            raydiumAmmProgram,
            user: publicKey,
            globalConfigInfo: globalConfigAccount,
            poolInfo: postionType === PositionType.LONG ? poolAccountForUSDC : poolAccountForRay,
            userPositionInfo: postionType === PositionType.LONG ? userPositionAccountForUSDC : userPositionAccountForRay,
            userPositionInTokenAccount,
            userPositionOutTokenAccount,
            coinTokenMint: symbol === "USCC" ? USDC.mint : RAY.mint,
            pcTokenMint: symbol === "USDC" ? RAY.mint : USDC.mint,
        }).signers([]).instruction();
        const transaction = new web3.Transaction();
        transaction.add(instruction)
        try {
            setLoading(true)
            sendTransaction(transaction, connection, {skipPreflight: true}).then(sig => {
                setLoading(false)
                console.log(sig)
            })
        } catch (error) {
            setLoading(false)
        }
    }, [publicKey, program]);

    useEffect(() => {
        fetchPostionBalanceInfo()
    }, [publicKey, connection, program])

    useEffect(() => {
        fetchUserPositionInfo()
    }, [publicKey , program, userPositionAccountForRay, userPositionAccountForUSDC])


    return {
        loading,
        poolKeys,
        poolInfo,
        longPosition,
        shortPosition,
        longBalances,
        shortBalances,
        fetchInfo,
        fetchUserPositionInfo,
        fetchPostionBalanceInfo,
        openPostion,
        closePosition,
        swapBaseIn,
        swapBaseOut
    }
}
