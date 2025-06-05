import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AssetMaster from '../components/Master/AssetMaster';
import LiabilityMaster from '../components/Master/LiabilityMaster';
import EquityMaster from '../components/Master/EquityMaster';
import MainLayout from '../components/Layout/MainLayout';

export default function MasterData() {
    const [tab, setTab] = React.useState(0);
    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
            <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
                <Tab label="Aset" />
                <Tab label="Liabilitas" />
                <Tab label="Ekuitas" />
            </Tabs>
            <Box hidden={tab !== 0}><AssetMaster /></Box>
            <Box hidden={tab !== 1}><LiabilityMaster /></Box>
            <Box hidden={tab !== 2}><EquityMaster /></Box>
            </Box>
        </MainLayout>
    );
}
