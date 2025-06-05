// components/Transactions/Summary/Summary.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Helper format Rupiah
function formatRupiah(value) {
    return value?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || 'Rp 0';
}

// Summary Card Komponen Modular
function SummaryCard({ label, value, color, bgcolor, icon }) {
    return (
        <Paper elevation={3} sx={{ p: 2, bgcolor }}>
            <Box display="flex" alignItems="center" gap={2}>
                {icon && <Box fontSize={32}>{icon}</Box>}
                <Box>
                    <Typography variant="subtitle2" color={color}>
                        {label}
                    </Typography>
                    <Typography variant="h6">{value}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default function Summary({ transactions = [] }) {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const netIncome = totalIncome - totalExpense;

    const summaryData = [
        {
            label: 'Total Pemasukan',
            value: formatRupiah(totalIncome),
            color: 'success.main',
            bgcolor: '#e8f5e9',
            icon: <TrendingUpIcon color="success" />,
        },
        {
            label: 'Total Pengeluaran',
            value: formatRupiah(totalExpense),
            color: 'error.main',
            bgcolor: '#ffebee',
            icon: <TrendingDownIcon color="error" />,
        },
        {
            label: 'Saldo Akhir',
            value: formatRupiah(netIncome),
            color: 'primary',
            bgcolor: '#f5f5f5',
            icon: <AccountBalanceWalletIcon color="primary" />,
        },
        {
            label: 'Jumlah Transaksi',
            value: transactions.length,
            color: 'text.primary',
            bgcolor: '#fffde7',
            icon: <ReceiptIcon color="warning" />,
        }
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {summaryData.map((item, idx) => (
                <Grid item xs={12} md={3} key={idx}>
                    <SummaryCard {...item} />
                </Grid>
            ))}
        </Grid>
    );
}