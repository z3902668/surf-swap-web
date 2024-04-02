import BigNumber from "bignumber.js";

export function parseUnits(amount: string, decimals: number) {
    return new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString();
}
export function formatUnits(amount: string, decimals: number) {
    return new BigNumber(amount).div(new BigNumber(10).pow(decimals)).toString();
}

