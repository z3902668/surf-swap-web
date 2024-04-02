import { TOKEN_PROGRAM_ID, getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import * as web3 from '@solana/web3.js'
// import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { RAY, USDC, Token } from "../config";
import { DECIMALS } from "../config/number";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useCommonDataProvider } from "../context/CommonDataContextProvider";
import { parseUnits } from "../utils";
import { useProgram } from './useProgram';

type Balance = {
    symbol: string
    value: string
}

type Liquidity = {
    bump: number
    lastAccPerLiquidit: anchor.BN
    liquidityAmount: anchor.BN
    tokenAmount: anchor.BN
}

export const useGetAccount = () => {
    const { publicKey, wallet } = useWallet();
    const { connection } = useConnection();
    const [balances, setBalances] = useState<Balance[]>([
        { symbol: 'RAY', value: '0' },
        { symbol: 'USDC', value: '0' },
    ]);
    async function fetchRay() {
        try {
            if (!publicKey || !connection) return
            const userTokenAccountForRay = await getAssociatedTokenAddress(
                RAY.mint,
                publicKey,
                false,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_PROGRAM_ID
            );
            const userTokenAccountForUsdc = await getAssociatedTokenAddress(
                USDC.mint,
                publicKey,
                false,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_PROGRAM_ID
            );
            let userTokenAccountInfoRAY = await getAccount(
                connection,
                userTokenAccountForRay,
                undefined,
                TOKEN_PROGRAM_ID,
            );
            let userTokenAccountInfoUSDC = await getAccount(
                connection,
                userTokenAccountForUsdc,
                undefined,
                TOKEN_PROGRAM_ID,
            )
            setBalances([
                { symbol: 'RAY', value: new BigNumber(userTokenAccountInfoRAY.amount.toString()).div(DECIMALS).toString() },
                { symbol: 'USDC', value: new BigNumber(userTokenAccountInfoUSDC.amount.toString()).div(DECIMALS).toString() },
            ]);
        } catch (error) {
            console.log("error", error)
            // setBalances([{symbol: 'RAY'}])
        }
    }

    useEffect(() => {
        fetchRay()
    }, [publicKey])

    return { balances, fetchRay }
}


export const useAddLiquidity = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { publicKey, sendTransaction } = useWallet();
    const [userLiquidityRay, setUserLiquidityRay] = useState<Liquidity>();
    const [userLiquidityUSDC, setUserLiquidityUSDC] = useState<Liquidity>();
    // const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const program = useProgram();
    const {
        poolAccountForRay,
        poolAccountForUSDC,
        poolTokenAccountForRay,
        poolTokenAccountForUSDC,
        userLiquidityAccountForUSDC,
        userLiquidityAccountForRay,
        userTokenAccountForRay,
        userTokenAccountForUSDC
    } = useCommonDataProvider();


    const fetchUserLiquidityInfo = async () => {
        if (program && userLiquidityAccountForRay && userLiquidityAccountForUSDC) {
            try {
                const userLiquidityRayInfo = await program.account.userLiquidityInfo.fetch(userLiquidityAccountForRay);
                console.log("userLiquidityRayInfo", userLiquidityRayInfo)
                setUserLiquidityRay({
                    bump: userLiquidityRayInfo.bump,
                    lastAccPerLiquidit: userLiquidityRayInfo.lastAccPerLiquidity,
                    liquidityAmount: userLiquidityRayInfo.liquidityAmount,
                    tokenAmount: userLiquidityRayInfo.tokenAmount
                })
            } catch (error) {
                console.log("error", error)
            }
            try {
                const userLiquidityUSDCInfo = await program.account.userLiquidityInfo.fetch(userLiquidityAccountForUSDC);
                console.log("userLiquidityUSDCInfo", userLiquidityUSDCInfo)
                setUserLiquidityUSDC({
                    bump: userLiquidityUSDCInfo.bump,
                    lastAccPerLiquidit: userLiquidityUSDCInfo.lastAccPerLiquidity,
                    liquidityAmount: userLiquidityUSDCInfo.liquidityAmount,
                    tokenAmount: userLiquidityUSDCInfo.tokenAmount
                })

            } catch (error) {
                console.log("error", error)
            }
        }
    }

    const handleAddLiquidity = async (amount: string, token: Token) => {
        if (!program || !publicKey || !userTokenAccountForRay) return

        let increaseLiquidityParams = {
            tokenAmount: new anchor.BN(parseUnits(amount, token.decimals)),
            minLiquidityAmount: new anchor.BN(0),
        }

        const instruction = await program.methods.increaseLiquidity(
            increaseLiquidityParams
        ).accounts({
            user: publicKey,
            userLiquidityInfo: token.mint === RAY.mint ? userLiquidityAccountForRay : userLiquidityAccountForUSDC,
            poolInfo: token.mint === RAY.mint ? poolAccountForRay : poolAccountForUSDC,
            poolTokenMint: token.mint,
            poolTokenAccount: token.mint === RAY.mint ? poolTokenAccountForRay : poolTokenAccountForUSDC,
            userTokenAccount: token.mint === RAY.mint ? userTokenAccountForRay :  userTokenAccountForUSDC,
        }).signers([]).instruction();

		const transaction = new web3.Transaction();
        transaction.add(instruction)
        try {
            setLoading(true)
            sendTransaction(transaction, connection).then(sig => {
                setLoading(false)
                console.log(sig)
            })
        } catch (error) {
            setLoading(false)
        }
    }

    const handleDecreaseLiquidity = async (symbol: string) => {
        const userLiquidityAccount = symbol === "USDC" ? userLiquidityAccountForUSDC : userLiquidityAccountForRay
        if (!program || !publicKey || !userLiquidityAccount) return
        let liquidityInfo = await program.account.userLiquidityInfo.fetch(userLiquidityAccount);

        let decreaseLiquidityParams = {
            amount: liquidityInfo.liquidityAmount,
        }
        const instruction = await program.methods.decreaseLiquidity(
            decreaseLiquidityParams
        ).accounts({
            user: publicKey,
            userLiquidityInfo: symbol === "USDC" ? userLiquidityAccountForUSDC : userLiquidityAccountForRay,
            poolInfo: symbol === "USDC" ? poolAccountForUSDC : poolAccountForRay,
            poolTokenMint: symbol === "USDC" ? USDC.mint : RAY.mint,
            poolTokenAccount: symbol === "USDC" ? poolTokenAccountForUSDC : poolTokenAccountForRay,
            userTokenAccount: symbol === "USDC" ? userTokenAccountForUSDC :  userTokenAccountForRay,
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
    }

    useEffect(() => {
        fetchUserLiquidityInfo()
    }, [program, userLiquidityAccountForRay, userLiquidityAccountForUSDC])

    return {
        loading,
        addLiquidity: handleAddLiquidity,
        removeLiquidity: handleDecreaseLiquidity,
        fetchUserLiquidityInfo,
        userLiquidityRay,
        userLiquidityUSDC
    }
}
