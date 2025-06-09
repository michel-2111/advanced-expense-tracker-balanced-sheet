import React, { useEffect } from 'react';
import { Tabs, Tab, Box, Paper, Typography, Fade } from '@mui/material';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useAuth } from '../context/AuthContext';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssetMaster from '../components/Master/AssetMaster';
import LiabilityMaster from '../components/Master/LiabilityMaster';
import EquityMaster from '../components/Master/EquityMaster';
import MainLayout from '../components/Layout/MainLayout';
import PageTransition from "../components/Layout/PageTransition";

export default function MasterData() {
    const [tab, setTab] = React.useState(0);
    const { setBreadcrumbs } = useBreadcrumb();
    const { role } = useAuth();

    useEffect(() => {
    setBreadcrumbs([
        { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
        { label: 'Home', path: role === 'admin' ? '/admin' : '/home' },
        { label: 'Master Data', path: '/master-data' }
    ]);
        }, [setBreadcrumbs, role]);

    return (
        <PageTransition>
        <MainLayout>
        <Box sx={{ p: { xs: 1, md: 3 } }}>
            <Fade in timeout={700}>
            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: "#f4f6fa" }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                Master Data Akun
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kelola data akun dasar seperti Aset, Liabilitas, dan Ekuitas. Data yang dimasukkan akan digunakan dalam seluruh fitur keuangan UMKM Finance.
                </Typography>
            </Paper>
            </Fade>
            <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            centered
            variant="fullWidth"
            sx={{ mb: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}
            >
            <Tab icon={<MonetizationOnIcon />} label="Aset" />
            <Tab icon={<TrendingDownIcon />} label="Liabilitas" />
            <Tab icon={<TrendingUpIcon />} label="Ekuitas" />
            </Tabs>
            <Fade in={tab === 0} timeout={500}><Box hidden={tab !== 0}><AssetMaster /></Box></Fade>
            <Fade in={tab === 1} timeout={500}><Box hidden={tab !== 1}><LiabilityMaster /></Box></Fade>
            <Fade in={tab === 2} timeout={500}><Box hidden={tab !== 2}><EquityMaster /></Box></Fade>
        </Box>
        </MainLayout>
        </PageTransition>
    );
}
