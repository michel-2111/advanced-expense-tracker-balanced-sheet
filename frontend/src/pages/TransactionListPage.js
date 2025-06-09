import React, { useEffect } from 'react';
import { Container, Typography, Fab, Tooltip, Pagination, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useAuth } from '../context/AuthContext';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import TransactionTable from '../components/Transactions/Table';
import TransactionEditDialog from '../components/Transactions/EditDialog';
import TransactionDeleteConfirm from '../components/Transactions/DeleteConfirm';
import TransactionFilterControls from '../components/Transactions/FilterControls';
import TransactionChart from '../components/Transactions/Chart';
import Summary from '../components/Transactions/Summary';
import PageTransition from "../components/Layout/PageTransition";

import exportToExcel from '../utils/exportToExcelF';
import handleImport from '../utils/ImportFromExcel';

import MainLayout from '../components/Layout/MainLayout';
import useTransactionManager from '../hooks/useTransactionManager';

export default function TransactionListPage() {
    const { setBreadcrumbs } = useBreadcrumb();
    const { role } = useAuth();
    const navigate = useNavigate();
    const {
        allTransactions, displayedTransactions, totalPages, page, setPage,
        editDialogOpen, handleEditOpen, handleEditClose,
        handleEditSubmit, selectedTransaction,
        deleteDialogOpen, handleDeleteOpen, handleDeleteClose, handleDeleteConfirm,
        transactions,
        handleFilter,
        fetchTransactions,
    } = useTransactionManager(10);

    const handleImportR = (e) => handleImport(e, fetchTransactions);

    const userRole = localStorage.getItem('role') || 'umkm';

    // Export seluruh hasil filter, bukan cuma yang tampil di tabel (page)
    const handleExport = () => {
        exportToExcel(
            allTransactions,
            'TransaksiUMKM.xlsx',
            [
                { key: 'No', label: 'No' },
                { key: 'type', label: 'Jenis', format: (val) => val?.toUpperCase() },
                { key: 'amount', label: 'Jumlah' },
                { key: 'category', label: 'Kategori' },
                { key: 'notes', label: 'Catatan' },
                { key: 'date', label: 'Tanggal', format: (val) => new Date(val).toLocaleString('id-ID') },
                { key: 'impact', label: 'Posisi', format: (val) => val === 'asset' ? 'Aset' : val === 'liability' ? 'Liabilitas' : 'Ekuitas' },
                { key: 'asset', label: 'Nama Posisi', format: (val, trx) => trx.asset?.name || trx.liability?.name || trx.equity?.name || '-' }
            ]
        );
    };

    useEffect(() => {
        setBreadcrumbs([
            { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Home', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Daftar Transaksi', path: '/list' }
        ]);
            }, [setBreadcrumbs, role]);

    return (
        <PageTransition>
        <MainLayout role={userRole}>
            <Container>
                <Paper elevation={4} sx={{ borderRadius: 4, p: 3, mb: 4 }}>
                    <Box sx={{ gap: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Cashflow
                        </Typography>
                        <Summary transactions={allTransactions} />
                    </Box>
                </Paper>
                <Paper elevation={4} sx={{ borderRadius: 4, p: 3, mb: 4 }}>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ mb:1 }}>
                            Daftar Transaksi
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TransactionFilterControls onFilter={handleFilter} />
                            <Button
                                variant="contained"
                                color="secondary"
                                component="label"
                                startIcon={<UploadFileIcon />}
                                sx={{
                                    fontWeight: 700, textTransform: 'none', boxShadow: 1, minWidth: 110, }}>
                                IMPORT
                                <input type="file" hidden accept=".xlsx, .xls" onChange={handleImportR} />
                            </Button>
                        </Box>
                    </Box>

                    <Paper elevation={0} sx={{ borderRadius: 3, mb: 3, mt: 2 }}>
                        <TransactionTable
                            transactions={displayedTransactions}
                            onEdit={handleEditOpen}
                            onDelete={handleDeleteOpen}
                            currentPage={page}
                            itemsPerPage={10}
                        /> </Paper>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/add')}
                            sx={{ minWidth: 180, fontWeight: 'bold', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            Tambah Transaksi
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<FileDownloadIcon />}
                            color="success"
                            onClick={handleExport}
                            sx={{ minWidth: 110, fontWeight: 'bold', whiteSpace: 'normal', wordBreak: 'break-word',  textTransform: 'none'}}>
                            EXPORT
                        </Button>
                        </Box>
                    </Box>
                </Paper>
                
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
                <Paper elevation={4} sx={{ borderRadius: 4, p: 4, mb: 4 }}>
                        <Typography variant="h6" align="center" fontWeight={700} mb={3}>
                            Grafik Bulanan
                        </Typography>
                    <TransactionChart transactions={transactions} period="monthly" />
                </Paper>          
            </Container>
        </MainLayout>
    </PageTransition>
    );
}
