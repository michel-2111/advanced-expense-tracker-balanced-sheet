import { useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button, Pagination, Stack } from '@mui/material';

import DocumentUploadForm from '../components/Documents/UploadForm';
import DocumentTable from '../components/Documents/Table';
import ConfirmDeleteDialog from '../components/Documents/ConfirmDeleteDialog';
import EditDocumentDialog from '../components/Documents/EditDialog';
import DocumentFilterControls from '../components/Documents/DocumentFilterControls';
import exportToExcel from '../utils/exportToExcel';
import DownloadIcon from '@mui/icons-material/Download';

import useDocumentManager from '../hooks/useDocumentManager';

export default function AdminArchive() {
    const {
        title, setTitle, file, setFile, status, setStatus, handleUpload,
        docs, confirmDelete, openDialog, setOpenDialog, handleDeleteConfirmed,
        editDialogOpen, setEditDialogOpen, editDoc, setEditDoc, openEditDialog, handleUpdate,
        filterStatus, setFilterStatus, sortField, setSortField, sortOrder, setSortOrder,
        searchQuery, setSearchQuery,
        loading,
        totalDocs, currentPage, setCurrentPage, itemsPerPage,
    } = useDocumentManager();

    return (
        <Container>
        <DocumentUploadForm
            title={title}
            setTitle={setTitle}
            file={file}
            setFile={setFile}
            status={status}
            setStatus={setStatus}
            handleUpload={handleUpload}/>

        <Box sx={{ mt: 5 }}>
            <Typography variant="h6" gutterBottom>Daftar Dokumen</Typography>
            <DocumentFilterControls
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}/>
            
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
                itemsPerPage={itemsPerPage}/>
            )}

        <ConfirmDeleteDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={handleDeleteConfirmed}/>

        <EditDocumentDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            doc={editDoc}
            onChange={setEditDoc}
            onSave={handleUpdate}/>

        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 4, flexWrap: 'wrap' }}>
            <Pagination
                count={Math.ceil(totalDocs / itemsPerPage)}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"/>

            <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={() => exportToExcel(docs)}>EXPORT</Button>
            </Box>
        </Box>
        </Container>
    );
}