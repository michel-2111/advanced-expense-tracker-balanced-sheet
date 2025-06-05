import { Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, IconButton, Chip, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DocumentTable({ docs, confirmDelete, openEditDialog, currentPage, itemsPerPage }) {
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Judul</TableCell>
                <TableCell>Link File</TableCell>
                <TableCell>Tanggal Upload</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aksi</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {docs.length === 0 ? (
                <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Box>
                    <img
                        src="/no-data.png"
                        alt="No Data"
                        width="120"
                        style={{ opacity: 0.6, marginBottom: '1rem' }}
                    />
                    <Typography variant="body1" color="text.secondary">
                        Tidak ada dokumen yang cocok dengan filter atau pencarian.
                    </Typography>
                    </Box>
                </TableCell>
                </TableRow>
            ) : (
                docs.map((doc, index) => (
                <TableRow key={doc.id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>
                    <a href={`http://localhost:5000${doc.fileUrl}`} target="_blank" rel="noreferrer">{doc.fileUrl.split('/').pop()}</a>
                    </TableCell>
                    <TableCell>{new Date(doc.createdAt).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                    <Chip
                        label={doc.status}
                        color={doc.status === 'terkirim' ? 'success' : 'warning'}
                        variant="outlined"
                    />
                    </TableCell>
                    <TableCell>
                    <IconButton onClick={() => confirmDelete(doc.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => openEditDialog(doc)} color="primary">
                        <EditIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
        </TableContainer>
    );
}