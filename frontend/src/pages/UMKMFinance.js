import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TransactionForm from '../components/Transactions/Form';

import MainLayout from '../components/Layout/MainLayout';

import useTransactionManager from '../hooks/useTransactionManager';

export default function UMKMFinance() {
    const navigate = useNavigate();
    const {
        form, setForm,
        handleSubmit,
    } = useTransactionManager(10);

return (
    <MainLayout>
        <Container>
            <Typography variant="h4" gutterBottom>
                Input Transaksi
            </Typography>

            <TransactionForm form={form} setForm={setForm} onSubmit={handleSubmit} />
        </Container>
    </MainLayout>
    );
}
