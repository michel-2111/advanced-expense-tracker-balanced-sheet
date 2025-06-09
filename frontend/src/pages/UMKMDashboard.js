import React, { useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PageTransition from "../components/Layout/PageTransition";

export default function UMKMDashboard() {
    const { setBreadcrumbs } = useBreadcrumb();
    const { role } = useAuth();
    const navigate = useNavigate();

    const userRole = localStorage.getItem('role') || 'umkm';

    useEffect(() => {
            setBreadcrumbs([
                { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
                { label: 'Home', path: '/home' },
            ]);
                }, [setBreadcrumbs, role]);

    return (
        <PageTransition>
        <MainLayout>
            <Box minHeight="90vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Paper sx={{ p: 7, borderRadius: 4, boxShadow: 6, textAlign: 'center', minWidth: 420 }}>
                <Typography variant="h4" fontWeight={700} mb={2}>
                    Selamat Datang, UMKM!
                </Typography>
                <Typography variant="subtitle1" mb={4} color="text.secondary">
                    Silakan pilih fitur yang ingin Anda gunakan:
                </Typography>
                <Box display="flex" gap={3} justifyContent="center">
                    <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<AccountCircleIcon />}
                    onClick={() => navigate('/master-data')}
                    >
                    Master Data Akun
                    </Button>
                    <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<AccountBalanceIcon />}
                    onClick={() => navigate('/list')}
                    >
                    Fitur Keuangan
                    </Button>
                </Box>
                </Paper>
            </Box>
        </MainLayout>
        </PageTransition>
    );
}
