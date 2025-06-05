import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);

export default function TransactionTable({ transactions = [], onEdit, onDelete, currentPage, itemsPerPage }) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Jenis</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Kategori</TableCell>
                            <TableCell>Catatan</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Posisi</TableCell>
                            <TableCell>Nama Posisi</TableCell>
                            <TableCell align="center">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <i>Tidak ada transaksi</i>
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((trx, index) => (
                                <TableRow key={trx.id}>
                                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                    <TableCell style={{ color: trx.type === 'income' ? 'green' : 'red' }}>
                                        {trx.type.toUpperCase()}
                                    </TableCell>
                                    <TableCell>{formatRupiah(trx.amount)}</TableCell>
                                    <TableCell>{trx.category}</TableCell>
                                    <TableCell>{trx.notes}</TableCell>
                                    <TableCell>{new Date(trx.date).toLocaleString('id-ID')}</TableCell>
                                    <TableCell>
                                        {trx.impact === 'asset' && 'Aset'}
                                        {trx.impact === 'liability' && 'Liabilitas'}
                                        {trx.impact === 'equity' && 'Ekuitas'}
                                    </TableCell>
                                    <TableCell>
                                        {trx.asset?.name || trx.liability?.name || trx.equity?.name || '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => onEdit(trx)} size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(trx)} size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}