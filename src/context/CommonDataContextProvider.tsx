import { PublicKey } from "@solana/web3.js";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { RAY, USDC, PROGRAM_ID } from "../config";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, createAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

export type CommonDataContextType = {
    globalConfigAccount: PublicKey
    globalConfigBump: number
    poolAccountForRay: PublicKey
    poolAccountForUSDC: PublicKey
    poolTokenAccountForRay: PublicKey | undefined
    poolTokenAccountForUSDC: PublicKey | undefined
    userLiquidityAccountForRay: PublicKey | undefined
    userLiquidityAccountForUSDC: PublicKey | undefined
    userPositionAccountForRay: PublicKey | undefined
    userPositionAccountForUSDC: PublicKey | undefined
    userTokenAccountForRay: PublicKey | undefined
    userTokenAccountForUSDC: PublicKey | undefined
    userPositionForRayTokenAccountForRay: PublicKey | undefined
    userPositionForRayTokenAccountForUSDC: PublicKey | undefined
    userPositionForUSDCTokenAccountForRay: PublicKey | undefined
    userPositionForUSDCTokenAccountForUSDC: PublicKey | undefined
};

export const DataContext = createContext({} as CommonDataContextType);

export function useCommonDataProvider() {
    return useContext(DataContext) as CommonDataContextType;
}

export function CommonDataContextProvider({ children }: { children: ReactNode }) {
    const [poolTokenAccount, setPoolTokenAccount] = useState<{[k in 'poolTokenAccountForRay' | 'poolTokenAccountForUSDC']: PublicKey | undefined}>({
        poolTokenAccountForRay: undefined,
        poolTokenAccountForUSDC: undefined
    });
    const { publicKey } = useWallet();
    // const { connection } = useConnection();
    const [poolAccountForRay,] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("pool_info"),
            RAY.mint.toBytes(),
        ],
        PROGRAM_ID,
    );
    const [poolAccountForUSDC,] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("pool_info"),
            USDC.mint.toBytes(),
        ],
        PROGRAM_ID,
    );

    const [globalConfigAccount, globalConfigBump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("global_config")
        ],
        PROGRAM_ID
    );

    const fetchCommonTokenAccount = async () => {
        try {
            const [poolTokenAccountForRay, poolTokenAccountForUSDC] = await Promise.all([
                getAssociatedTokenAddress(
                    RAY.mint,
                    poolAccountForRay,
                    true,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_PROGRAM_ID,
                ),
                getAssociatedTokenAddress(
                    USDC.mint,
                    poolAccountForUSDC,
                    true,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_PROGRAM_ID,
                ),
            ])
            setPoolTokenAccount({
                poolTokenAccountForRay,
                poolTokenAccountForUSDC,
            })
        } catch (error) {

        }
    }


    const userLiquidityAccounts = useMemo(() => {
        if (!publicKey) return {
            userLiquidityAccountForRay: undefined,
            userLiquidityAccountForUSDC: undefined,
            userPositionAccountForRay: undefined,
            userPositionAccountForUSDC: undefined,
            userTokenAccountForRay: undefined,
            userTokenAccountForUSDC: undefined,
            userPositionForRayTokenAccountForRay: undefined,
            userPositionForRayTokenAccountForUSDC: undefined,
            userPositionForUSDCTokenAccountForRay: undefined,
            userPositionForUSDCTokenAccountForUSDC: undefined
        }
        const [userLiquidityAccountForRay,] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("user_liquidity_info"),
                poolAccountForRay.toBytes(),
                publicKey.toBytes(),
            ],
            PROGRAM_ID,
        );

        const [userLiquidityAccountForUSDC,] = PublicKey.findProgramAddressSync(
            [
              Buffer.from("user_liquidity_info"),
              poolAccountForUSDC.toBytes(),
              publicKey.toBytes(),
            ],
            PROGRAM_ID,
          );

        const [userPositionAccountForRay,] = PublicKey.findProgramAddressSync(
            [
              Buffer.from("user_position_info"),
              poolAccountForRay.toBytes(),
              publicKey.toBytes(),
            ],
            PROGRAM_ID,
          );
        const [userPositionAccountForUSDC,] = PublicKey.findProgramAddressSync(
            [
              Buffer.from("user_position_info"),
              poolAccountForUSDC.toBytes(),
              publicKey.toBytes(),
            ],
            PROGRAM_ID,
        );

        const [userTokenAccountForRay, ] = PublicKey.findProgramAddressSync(
            [
                publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                RAY.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );
        const [userTokenAccountForUSDC, ] = PublicKey.findProgramAddressSync(
            [
                publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                USDC.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );;

        const [userPositionForRayTokenAccountForRay,] = PublicKey.findProgramAddressSync(
            [
                userPositionAccountForRay.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                RAY.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );

        const [userPositionForRayTokenAccountForUSDC,] = PublicKey.findProgramAddressSync(
            [
                userPositionAccountForRay.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                USDC.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );

        const [userPositionForUSDCTokenAccountForUSDC,] = PublicKey.findProgramAddressSync(
            [
                userPositionAccountForUSDC.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                USDC.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );
        const [userPositionForUSDCTokenAccountForRay,] = PublicKey.findProgramAddressSync(
            [
                userPositionAccountForUSDC.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                RAY.mint.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID,
        );


        return {
            userLiquidityAccountForRay,
            userLiquidityAccountForUSDC,
            userPositionAccountForRay,
            userPositionAccountForUSDC,
            userTokenAccountForRay,
            userTokenAccountForUSDC,
            userPositionForRayTokenAccountForRay,
            userPositionForRayTokenAccountForUSDC,
            userPositionForUSDCTokenAccountForRay,
            userPositionForUSDCTokenAccountForUSDC
        };

    }, [publicKey])

    useEffect(() => {
        fetchCommonTokenAccount()
    }, [])


    return <DataContext.Provider value={{
        globalConfigAccount,
        globalConfigBump,
        poolAccountForRay,
        poolAccountForUSDC,
        ...poolTokenAccount,
        ...userLiquidityAccounts
    }}>
        {children}
    </DataContext.Provider>;
}
