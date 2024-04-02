import { Box, Button, Typography } from "@mui/material";
import { TradeBox, InputBox, LiquidityBox } from "./styles";
import Input from "../../components/Input";
import CustomSelect from "../../components/Select";

import { useGetAccount, useAddLiquidity } from "../../hooks/useLiquidity";
import { useMemo, useState } from "react";
import { RAY, USDC } from "../../config";
import BigNumber from "bignumber.js";
import TokenIcon from "../../components/TokneIcon";
import { formatUnits } from "../../utils";

export default function Liquidity() {
    const [amount, setAmount] = useState<string>('');
    const [symbol, setSymbol] = useState<string | null>();
    // const { balances } = useGetAccount();
    const {
        loading,
        userLiquidityRay,
        userLiquidityUSDC,
        addLiquidity,
        removeLiquidity,
        fetchUserLiquidityInfo
     } = useAddLiquidity();
    const token = useMemo(() => {
        return symbol === 'RAY' ? RAY : USDC
    }, [symbol])

    const isConfirm = useMemo(() => {
        return new BigNumber(amount || '0').gt(0)
    }, [amount])

    async function handleAddLiquidity() {
        if (Number(amount) > 0) {
            await addLiquidity(amount, token);
            fetchUserLiquidityInfo()
        }
    }
    async function handleRmoveLiquidity(symbol: string) {
        if (symbol) {
            await removeLiquidity(symbol);
            fetchUserLiquidityInfo()
        }
    }

    return (
        <>
            <TradeBox>
                <Typography mb="14px">Add Liquidity</Typography>
                <InputBox>
                    <CustomSelect
                        placeholder="Select Token"
                        defaultValue="RAY"
                        value={symbol}
                        options={[
                            { label: 'RAY', value: 'RAY' },
                            { label: 'USDC', value: 'USDC' }
                        ]}
                        onChange={(e) => setSymbol(e)}
                    />
                    <Input
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </InputBox>
                <Box sx={{ mt: '20px' }}>
                    <Button disabled={loading || !isConfirm} size="large" fullWidth variant="contained" onClick={handleAddLiquidity}>
                        {loading ? "Loading..." : 'Confirm'}
                    </Button>
                </Box>
            </TradeBox>
            {userLiquidityUSDC &&
                <LiquidityBox>
                    <Box><TokenIcon symbol="USDC"/></Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="#838383" fontSize="12px">TokenAmount</Typography>
                        <Typography fontSize="14px">{formatUnits(userLiquidityUSDC?.tokenAmount.toString() || '0', 6) || '--'}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="#838383" fontSize="12px">Liquidity Amount</Typography>
                        <Typography fontSize="14px">{formatUnits(userLiquidityUSDC?.liquidityAmount.toString() || 0, 6) || '--'}</Typography>
                    </Box>
                    <Button disabled={loading} variant="contained" onClick={() => handleRmoveLiquidity('USDC')}>
                        {loading ? "Loading..." : 'Remove Liquidity'}
                    </Button>
                </LiquidityBox>
            }
            {userLiquidityRay &&
                <LiquidityBox>
                    <Box><TokenIcon symbol="RAY"/></Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="#838383" fontSize="12px">TokenAmount</Typography>
                        <Typography fontSize="14px">{formatUnits(userLiquidityRay?.tokenAmount.toString() || '0', 6)  || '--'}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="#838383" fontSize="12px">Liquidity Amount</Typography>
                        <Typography fontSize="14px">{formatUnits(userLiquidityRay?.liquidityAmount.toString() || '0', 6) || '--'}</Typography>
                    </Box>
                    <Button disabled={loading} variant="contained" onClick={() => handleRmoveLiquidity('RAY')}>
                        {loading ? "Loading..." : 'Remove Liquidity'}
                    </Button>
                </LiquidityBox>
            }
        </>

    )
}
