import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { PROGRAM_ID } from "../config";
import { IDL } from "../config/IDL/surf_swap";


export const useProgram = () => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    return useMemo(() => {
        if (!wallet) return undefined
        const provider = new anchor.AnchorProvider(connection, wallet, {});
        return new anchor.Program(
            IDL,
            PROGRAM_ID,
            provider
        );
    }, [wallet, connection])
}
