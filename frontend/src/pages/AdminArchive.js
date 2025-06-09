import { Container, Typography, Box, CircularProgress, Button, Pagination, Paper, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useBreadcrumb } from '../context/BreadcrumbContext';

import DocumentUploadForm from '../components/Documents/UploadForm';
import DocumentTable from '../components/Documents/Table';
import ConfirmDeleteDialog from '../components/Documents/ConfirmDeleteDialog';
import EditDocumentDialog from '../components/Documents/EditDialog';
import DocumentFilterControls from '../components/Documents/DocumentFilterControls';
import exportToExcel from '../utils/exportToExcel';
import DownloadIcon from '@mui/icons-material/Download';
import useDocumentManager from '../hooks/useDocumentManager';
import MainLayout from '../components/Layout/MainLayout';
import PageTransition from "../components/Layout/PageTransition";

export default function AdminArchive() {
    const { setBreadcrumbs } = useBreadcrumb();
    const { role } = useAuth();
    const {
        title, setTitle, file, setFile, status, setStatus, handleUpload,
        docs, confirmDelete, openDialog, setOpenDialog, handleDeleteConfirmed,
        editDialogOpen, setEditDialogOpen, editDoc, setEditDoc, openEditDialog, handleUpdate,
        filterStatus, setFilterStatus, sortField, setSortField, sortOrder, setSortOrder,
        searchQuery, setSearchQuery,
        loading,
        totalDocs, currentPage, setCurrentPage, itemsPerPage,
    } = useDocumentManager();

    useEffect(() => {
        setBreadcrumbs([
            { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Home', path: role === 'admin' ? '/admin' : '/home' },
            { label: 'Daftar Dokumen', path: '/admin' }
        ]);
            }, [setBreadcrumbs, role]);

    if (role !== 'admin') return <Navigate to="/" />;

    return (
        <PageTransition>
        <MainLayout>
            <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
                {/* --- Upload Form --- */}
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                    <Typography variant="h6" fontWeight={700} mb={2}>Document Archive</Typography>
                    <DocumentUploadForm
                        title={title}
                        setTitle={setTitle}
                        file={file}
                        setFile={setFile}
                        status={status}
                        setStatus={setStatus}
                        handleUpload={handleUpload}
                    />
                </Paper>

                {/* --- Daftar Dokumen --- */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" fontWeight={700}>Daftar Dokumen</Typography>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<DownloadIcon />}
                            onClick={() => exportToExcel(docs)}
                            sx={{ minWidth: 110, fontWeight: 700 }}
                        >
                            EXPORT
                        </Button>
                    </Box>
                    <DocumentFilterControls
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                        sortField={sortField}
                        setSortField={setSortField}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    {loading ? (
                        <Box display="flex" justifyContent="center" sx={{ my: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DocumentTable
                            docs={docs}
                            confirmDelete={confirmDelete}
                            openEditDialog={openEditDialog}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                    )}

                    {/* --- Pagination --- */}
                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Pagination
                            count={Math.ceil(totalDocs / itemsPerPage)}
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                            color="primary"
                        />
                    </Stack>
                </Paper>

                {/* --- Dialog --- */}
                <ConfirmDeleteDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={handleDeleteConfirmed}
                />
                <EditDocumentDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    doc={editDoc}
                    onChange={setEditDoc}
                    onSave={handleUpdate}
                />
            </Container>
        </MainLayout>
        </PageTransition>
    );
}