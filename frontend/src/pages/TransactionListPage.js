import React from 'react';
import { Container, Typography, Fab, Tooltip, Pagination, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';

import TransactionTable from '../components/Transactions/Table';
import TransactionEditDialog from '../components/Transactions/EditDialog';
import TransactionDeleteConfirm from '../components/Transactions/DeleteConfirm';
import TransactionFilterControls from '../components/Transactions/FilterControls';
import TransactionChart from '../components/Transactions/Chart';
import Summary from '../components/Transactions/Summary';

import MainLayout from '../components/Layout/MainLayout';

import useTransactionManager from '../hooks/useTransactionManager';

export default function TransactionListPage() {
    const navigate = useNavigate();
    const {
        allTransactions, displayedTransactions, totalPages, page, setPage,
        editDialogOpen, handleEditOpen, handleEditClose,
        handleEditSubmit, selectedTransaction,
        deleteDialogOpen, handleDeleteOpen, handleDeleteClose, handleDeleteConfirm,
        transactions,
        handleFilter,
    } = useTransactionManager(10);

    return (
        <MainLayout>
            <Container>
                <Box sx ={{ mt:2, mb: 4}}>
                    <Typography variant="h6" gutterBottom>
                        Cashflow
                    </Typography>
                    <Summary transactions={allTransactions} />
                </Box>

                <Box sx ={{ mt:2, mb: 4}}>
                    <Typography variant="h6" gutterBottom>
                        Daftar Transaksi
                    </Typography>       
                    <TransactionFilterControls onFilter={handleFilter} /> 
                </Box>

                <TransactionTable
                    transactions={displayedTransactions}
                    onEdit={handleEditOpen}
                    onDelete={handleDeleteOpen}
                    currentPage={page}
                    itemsPerPage={10}
                />

                <Box sx={{ mt: 2,mb: 4,display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',gap: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/dashboard')}
                        sx={{ minWidth: 180, fontWeight: 'bold' }}>
                        Tambah Transaksi
                    </Button>
                </Box>
                
                <TransactionEditDialog
                    open={editDialogOpen}
                    onClose={handleEditClose}
                    onSubmit={handleEditSubmit}
                    initialData={selectedTransaction}
                />

                <TransactionDeleteConfirm
                    open={deleteDialogOpen}
                    onClose={handleDeleteClose}
                    onConfirm={handleDeleteConfirm}
                    transaction={selectedTransaction}
                />

                <Tooltip title="Lihat Balance Sheet">
                    <Fab
                        color="primary"
                        aria-label="Balance Sheet"
                        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 999 }}
                        onClick={() => navigate('/balance-sheet')}
                    >
                        <AssessmentIcon />
                    </Fab>
                </Tooltip>

                <Typography variant="h6" mt={4}>
                    Grafik Bulanan
                </Typography>
                <TransactionChart transactions={transactions} period="monthly" />                
                </Container>
        </MainLayout>
    );
}
