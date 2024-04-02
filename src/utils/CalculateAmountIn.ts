import {
    jsonInfo2PoolKeys,
    Liquidity,
    LiquidityPoolKeys,
    Percent,
    Token,
    TokenAmount,
    ApiPoolInfoV4,
    LIQUIDITY_STATE_LAYOUT_V4,
    MARKET_STATE_LAYOUT_V3,
    SPL_MINT_LAYOUT,
    Market,
    TOKEN_PROGRAM_ID,
    LiquidityPoolInfo,
} from '@raydium-io/raydium-sdk';

import {
    Connection,
    PublicKey
} from '@solana/web3.js';

export const formatAmmKeysById = async (connection: Connection, id: string): Promise<ApiPoolInfoV4> => {
    const account = await connection.getAccountInfo(new PublicKey(id))
    if (account === null) throw Error(' get id info error ')
    const info = LIQUIDITY_STATE_LAYOUT_V4.decode(account.data)


    const marketId = info.marketId
    const marketAccount = await connection.getAccountInfo(marketId)
    if (marketAccount === null) throw Error(' get market info error')
    const marketInfo = MARKET_STATE_LAYOUT_V3.decode(marketAccount.data)

    const lpMint = info.lpMint
    const lpMintAccount = await connection.getAccountInfo(lpMint)
    if (lpMintAccount === null) throw Error(' get lp mint info error')
    const lpMintInfo = SPL_MINT_LAYOUT.decode(lpMintAccount.data)

    return {
        id,
        baseMint: info.baseMint.toString(),
        quoteMint: info.quoteMint.toString(),
        lpMint: info.lpMint.toString(),
        baseDecimals: info.baseDecimal.toNumber(),
        quoteDecimals: info.quoteDecimal.toNumber(),
        lpDecimals: lpMintInfo.decimals,
        version: 4,
        programId: account.owner.toString(),
        authority: Liquidity.getAssociatedAuthority({ programId: account.owner }).publicKey.toString(),
        openOrders: info.openOrders.toString(),
        targetOrders: info.targetOrders.toString(),
        baseVault: info.baseVault.toString(),
        quoteVault: info.quoteVault.toString(),
        withdrawQueue: info.withdrawQueue.toString(),
        lpVault: info.lpVault.toString(),
        marketVersion: 3,
        marketProgramId: info.marketProgramId.toString(),
        marketId: info.marketId.toString(),
        marketAuthority: Market.getAssociatedAuthority({ programId: info.marketProgramId, marketId: info.marketId }).publicKey.toString(),
        marketBaseVault: marketInfo.baseVault.toString(),
        marketQuoteVault: marketInfo.quoteVault.toString(),
        marketBids: marketInfo.bids.toString(),
        marketAsks: marketInfo.asks.toString(),
        marketEventQueue: marketInfo.eventQueue.toString(),
        lookupTableAccount: PublicKey.default.toString()
    }
}

const CalculateAmountIn = async (amount: string, inputSymbol: string, poolKeys: LiquidityPoolKeys,  poolInfo: LiquidityPoolInfo) => {
    const RAY = new Token(TOKEN_PROGRAM_ID, new PublicKey('GziCFD5krogrse1EypTVjGxZGwY6DDRteTfdmvyVDqeH'), 6, 'RAY', 'RAY')
    const USDC = new Token(TOKEN_PROGRAM_ID, new PublicKey('ESTgXYjrwTHGwSfZZLUPB7zxD6vMszHAamgN5P8Qo4Sg'), 6, 'USDC', 'USDC');

    const inputToken = inputSymbol === "RAY" ? RAY : USDC;
    const outputToken = inputSymbol === "RAY" ? USDC : RAY;
    const amountOut = new TokenAmount(outputToken, amount)
    const slippage = new Percent(1, 100)
    try {
        const { amountIn, maxAmountIn } = Liquidity.computeAmountIn({
            poolKeys: poolKeys,
            poolInfo: poolInfo,
            amountOut: amountOut,
            currencyIn: inputToken,
            slippage: slippage,
        })
        console.log(`get ${amountOut.toFixed()} ${amountOut.token.symbol} need ${amountIn.toFixed()} ${inputToken.symbol}, maxAmountIn is ${maxAmountIn.toFixed()}`);
        return { amountIn, maxAmountIn }
    } catch (error) {
        return { amountIn: 0, maxAmountIn: 0 }
    }
};

export default CalculateAmountIn;
