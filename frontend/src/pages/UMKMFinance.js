import React, { useEffect } from 'react';
import { Container, Typography, Box, Button, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useAuth } from '../context/AuthContext';

import TransactionForm from '../components/Transactions/Form';
import MainLayout from '../components/Layout/MainLayout';
import PageTransition from "../components/Layout/PageTransition";

import useTransactionManager from '../hooks/useTransactionManager';

export default function UMKMFinance() {
    const { setBreadcrumbs } = useBreadcrumb();
    const { role } = useAuth();
    const navigate = useNavigate();
    const {
        form, setForm,
        handleSubmit,
    } = useTransactionManager(10);
    const userRole = localStorage.getItem('role') || 'umkm';

useEffect(() => {
        setBreadcrumbs([
            { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Home', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Daftar Transaksi', path: '/list' },
            { label: 'Tambah Transaksi', path: '/add' }
        ]);
            }, [setBreadcrumbs, role]);

return (
    <PageTransition>
    <MainLayout role={userRole}>
        <Container>
        <Paper elevation={4} sx={{ borderRadius: 4, p: 3, mb: 4 }}>
            <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Input Transaksi
                </Typography>

                <TransactionForm form={form} setForm={setForm} onSubmit={handleSubmit} />
            </Container>
        </Paper>
        </Container>
    </MainLayout>
    </PageTransition>
    );
}
