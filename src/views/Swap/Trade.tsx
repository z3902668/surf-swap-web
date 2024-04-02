import { Box, Typography, Button, Stack } from "@mui/material";
import Input from "../../components/Input";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CustomSelect from "../../components/Select";
import LeverageSlider, { marks } from "../../components/LeverageSlider";
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { TradeBox, Card, InputBox, LeverageBox, ExchangeBox, TradeLayout, Flex, PostionBox } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { PositionType, useTrade } from "../../hooks/useTrade";
import CalculateAmountOut from "../../utils/CalculateAmountOut";
import CalculateAmountIn from "../../utils/CalculateAmountIn";
import { useGetAccount } from "../../hooks/useLiquidity";
import BigNumber from "bignumber.js";
import { publicKey } from "@raydium-io/raydium-sdk";
import { formatUnits, parseUnits } from "../../utils";
import dayjs from "dayjs";
import TokenIcon from "../../components/TokneIcon";

export default function Trade() {
    const [symbol, setSymbol] = useState<string | null>("RAY");
    const [positionType, setPositionType] = useState<PositionType>(PositionType.LONG);
    // const [exchangCount, setExchangeCount] = useState<number>(0);
    const [amountIn, setAmountIn] = useState<string>('');
    const [amountOut, setAmountOut] = useState<string>('');
    const [levearge, setLevearge] = useState<number>(1);
    const [coins, setCoins] = useState<string[]>([]);
    const [inputType, setInputType] = useState("in");
    const {
        loading,
        poolInfo,
        poolKeys,
        longPosition,
        shortPosition,
        longBalances,
        shortBalances,
        fetchInfo,
        fetchUserPositionInfo,
        fetchPostionBalanceInfo,
        openPostion,
        closePosition,
        swapBaseOut,
        swapBaseIn,
    } = useTrade();
    const { balances } = useGetAccount();


    useEffect(() => {
        if (positionType === PositionType.LONG) {
            if (Number(longPosition?.userAmount)) {
                setCoins(['RAY', 'USDC'])
            } else {
                setCoins(['USDC', 'RAY'])
            }
        } else {
            if (Number(shortPosition?.userAmount)) {
                setCoins(['USDC', 'RAY'])
            } else {
                setCoins(['RAY', 'USDC'])
            }
        }
    }, [positionType, longPosition?.userAmount, shortPosition?.userAmount]);

    const balanceList = useMemo(() => {
        if (positionType === PositionType.LONG) {
            if (longPosition) {
                return longBalances
            } else {
                return balances
            }
        } else {
            if (shortPosition) {
                return shortBalances
            } else {
                return balances
            }
        }
    }, [positionType, longBalances[0].value, longBalances[1].value, shortBalances[0].value, shortBalances[1].value])

    const defaultLeverage = useMemo(() => {
        let leve = 0
        if (positionType === PositionType.LONG && longPosition) {
            leve = new BigNumber(longPosition?.userAmount).plus(longPosition?.borrowAmount).div(longPosition?.userAmount).toNumber()
            setLevearge(leve)
        } else if (positionType === PositionType.SHORT && shortPosition) {
            leve = new BigNumber(shortPosition?.userAmount).plus(shortPosition?.borrowAmount).div(shortPosition?.userAmount).toNumber()
            setLevearge(leve)

        }
        return leve
    }, [longPosition, shortPosition, positionType])

    function getAmount(amount: string) {
        if (positionType === PositionType.LONG) {
            if (longPosition) {
                return Number(amount)
            } else {
                return Number(amount) * levearge
            }
        } else {
            if (shortPosition) {
                return Number(amount)
            } else {
                return Number(amount) * levearge
            }
        }
    }

    const handleChange = (p: PositionType) => {
        setPositionType(p);
    };
    const handleExchangeArrow = () => {
        if (positionType === PositionType.LONG && longPosition?.userAmount ||
            positionType === PositionType.SHORT && shortPosition?.userAmount
        ) {
            setCoins([...coins.reverse()])
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [publicKey]);

    const handleChangeAmountIn = (e: any) => {
        const v = e.target.value;
        setAmountIn(v);
        setInputType("in");
        if (v !== '' && Number(v) > 0 && poolKeys && poolInfo && coins.length) {
            const amount = getAmount(v);
            CalculateAmountOut(parseUnits(amount.toString(), 6), coins[0], poolKeys, poolInfo).then((res) => {
                setAmountOut(res.amountOut.toFixed(6));
            });
        } else {
            setAmountOut('');
        }
    };
    const handleChangeAmountOut = (e: any) => {
        const v = e.target.value;
        setAmountOut(v);
        setInputType("Out");
        if (v !== '' && Number(e.target.value) > 0 && poolKeys && poolInfo && coins.length) {
            CalculateAmountIn(parseUnits(e.target.value, 6), coins[1], poolKeys, poolInfo).then((res) => {
                setAmountIn(res.amountIn.toFixed(6));
            });
        } else {
            setAmountIn('')
        }
    };
    const handleLeverage = (_: any, v: any) => {
        setLevearge(v)
    }

    const handleConfirm = async () => {
        if (positionType == PositionType.LONG) {
            if (!longPosition) {
                console.log("handleConfirm")
                const positionAmount = amountIn;
                const borrowAmount = new BigNumber(amountIn).times(levearge).minus(amountIn).toString();
                await openPostion(positionAmount, borrowAmount, positionType);
            } else {
                if (inputType === "in") {
                    await swapBaseIn(amountIn, coins[0], positionType)
                } else if (inputType === "Out") {
                    await swapBaseOut(amountIn, amountOut, coins[1], positionType)
                }
            }
        } else {
            if (!shortPosition) {
                const positionAmount = amountIn;
                const borrowAmount = new BigNumber(amountIn).times(levearge).minus(amountIn).toString();
                await openPostion(positionAmount, borrowAmount, positionType)
            } else {
                if (inputType === "in") {
                    await swapBaseIn(amountIn, coins[0], positionType)
                } else if (inputType === "Out") {
                    await swapBaseOut(amountIn, amountOut, coins[1], positionType)
                }
            }
        }
        fetchUserPositionInfo()
        fetchPostionBalanceInfo()
    };
    const handleClose = async (p: PositionType) => {
        try {
            await closePosition(p)
        } catch (error) {

        }

    }

    return (
        <TradeLayout>
            <TradeBox>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <Button
                        onClick={() => handleChange(PositionType.LONG)}
                        fullWidth
                        style={{
                            background: positionType === PositionType.LONG ? '#0ABAB5' : '#0abab526',
                            border: '1px solid #0ABAB5'
                        }}
                    >
                        <AiOutlineRise /> &nbsp; Long
                    </Button>
                    <Button
                        onClick={() => handleChange(PositionType.SHORT)}
                        fullWidth
                        style={{
                            background: positionType === PositionType.SHORT ? '#FF3A33' : 'rgba(255, 4, 32, 0.15)',
                            border: '1px solid #FF3A33'
                        }}
                    >
                        <AiOutlineFall /> &nbsp; Short
                    </Button>
                </Box>
                <Card>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 0'
                        }}
                    >

                        <CustomSelect
                            placeholder="Select Token"
                            value={symbol}
                            defaultValue="RAY"
                            options={[{ label: 'RAY/USDT ', value: 'RAY', }]}
                            onChange={(v) => setSymbol(v)}
                        />
                        <LeverageBox>{levearge}x</LeverageBox>
                    </Box>
                    <LeverageSlider
                        min={1}
                        max={10}
                        getAriaValueText={value => `${value}x`}
                        disabled={!!defaultLeverage}
                        marks={marks}
                        value={levearge}
                        onChange={handleLeverage}
                    />
                </Card>
                <Box sx={{ width: '100px', height: '20px' }} />
                <Card>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}
                    >
                        <Typography color='#fff' fontSize="14px">Ave: {balanceList.find(f => f.symbol === coins[0])?.value}</Typography>
                        {/* <Button size="small" variant="text" onClick={() => {
                            setAmountIn(balanceList[coins[0]])
                        }}>Max</Button> */}
                    </Box>
                    <InputBox>
                        <TokenIcon symbol={coins[0]} />
                        <Input
                            placeholder="0.0"
                            value={amountIn}
                            onChange={handleChangeAmountIn}
                        />
                    </InputBox>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', m: '18px 0 7px', cursor: "pointer" }}
                        onClick={handleExchangeArrow}
                    >
                        <ExchangeBox><SwapVertIcon style={{ color: '#fff' }} /></ExchangeBox>
                    </Box>
                    <Box sx={{ display: 'flex', color: '#fff', marginBottom: '4px' }}>
                        Ave: {balanceList.find(f => f.symbol === coins[1])?.value}
                    </Box>
                    <InputBox>
                        <TokenIcon symbol={coins[1]} />
                        <Input
                            placeholder="0.0"
                            value={amountOut}
                            onChange={handleChangeAmountOut}
                            disabled={
                                (positionType === PositionType.LONG && !longPosition) ||
                                (positionType === PositionType.SHORT && !shortPosition)
                            }
                        />
                    </InputBox>
                </Card>
                <Stack sx={{ m: '20px 0' }}>
                    <Button
                        disabled={loading}
                        size="large"
                        fullWidth
                        variant="contained"
                        onClick={handleConfirm}
                    >
                        {loading ? 'Loading' : 'Confirm'}
                    </Button>
                </Stack>
            </TradeBox>
            {longPosition &&
                <TradeBox>
                   <PostionBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                            {/* <TokenIcon symbol={"USDC"} /> */}
                            <Typography color="#0ABAB5" variant="h5">
                                Long
                            </Typography>
                        </Box>
                        <Flex>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Position Size</Typography>
                                <Typography fontSize="14px">
                                    {formatUnits(longPosition?.userAmount || '0', 6)} USDC
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Borrow Size</Typography>
                                <Typography fontSize="14px">
                                    {formatUnits(longPosition?.borrowAmount || '0', 6)} USDC
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px" textAlign="right">Leverage</Typography>
                                <Typography fontSize="14px" textAlign="right">
                                    {new BigNumber(longPosition?.userAmount).plus(longPosition?.borrowAmount).div(longPosition?.userAmount).toNumber()}x
                                </Typography>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Fee</Typography>
                                <Typography fontSize="14px">
                                    {formatUnits(longPosition?.borrowFeeRate.toString(), 4)}%
                                </Typography>
                            </Box>

                            <Box>
                                <Typography color="#838383" fontSize="12px">Time</Typography>
                                <Typography fontSize="14px">
                                    {dayjs.unix(Number(longPosition?.openAt.toString())).format("YYYY MM:DD HH:mm")}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px" textAlign="right">Value</Typography>
                                <Typography fontSize="14px"  textAlign="right">
                                    {balanceList[0].value}{coins[0]}
                                </Typography>
                                <Typography fontSize="10px" textAlign="right" margin="-4px 0">
                                    +
                                </Typography>
                                <Typography fontSize="14px"  textAlign="right">
                                    {balanceList[1].value} {coins[1]}
                                </Typography>
                            </Box>
                        </Flex>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Button disabled={loading} size="small" fullWidth variant="contained" onClick={() => handleClose(PositionType.LONG)}>
                                {loading ? 'Loading' : 'Close'}
                            </Button>
                        </Box>
                    </PostionBox>
                </TradeBox>
            }
            {shortPosition &&
                <TradeBox>
                    <PostionBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                            {/* <TokenIcon symbol={"USDC"} /> */}
                            <Typography color="rgb(255, 58, 51)" variant="h5">
                                Short
                            </Typography>
                        </Box>
                        <Flex>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Position Size</Typography>
                                <Typography fontSize="14px">
                                    {formatUnits(shortPosition?.userAmount || '0', 6)} USDC
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Borrow Size</Typography>
                                <Typography fontSize="14px">
                                    {formatUnits(shortPosition?.borrowAmount || '0', 6)} USDC
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px" textAlign="right">Leverage</Typography>
                                <Typography fontSize="14px" textAlign="right">
                                    {defaultLeverage ? `${defaultLeverage}x` : ''}
                                </Typography>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Fee</Typography>
                                <Typography fontSize="14px">
                                    {shortPosition?.borrowFeeRate} USDC
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="#838383" fontSize="12px">Time</Typography>
                                <Typography fontSize="14px">
                                    {dayjs.unix(Number(shortPosition?.openAt.toString())).format("YYYY MM:DD HH:mm")}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button size="small" variant="contained" onClick={() => handleClose(PositionType.SHORT)}>Close</Button>
                            </Box>
                        </Flex>
                    </PostionBox>
                </TradeBox>
            }
        </TradeLayout>
    )
}
