

import { Tabs } from '@mui/base/Tabs';
import { TabsList, Tab, TabPanel } from "../../components/Tabs"

import { Wrapper } from "./styles";
import Trade from './Trade';
import Liquidity from './Liquidity';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

enum TabType {
    Trade,
    Liquidity
}
function Swap() {
    const [tab, setTab] = useState<TabType>(TabType.Trade);
    function handleTypeChange(t: TabType) {
        setTab(t);
    }
    return (
        <Wrapper>
            <Box sx={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px'}}>
                <Button
                    onClick={() => handleTypeChange(TabType.Trade)}
                    fullWidth
                    variant={tab === TabType.Trade ? 'contained' : 'outlined'}>
                    Trade
                </Button>
                <Button
                    onClick={() => handleTypeChange(TabType.Liquidity)}
                    fullWidth
                    variant={tab === TabType.Liquidity ? 'contained' : 'outlined'}>
                    Liquidity
                </Button>
            </Box>
            {tab === TabType.Trade && <Trade />}
            {tab === TabType.Liquidity && <Liquidity />}
        </Wrapper>
    );
}

export default Swap;
