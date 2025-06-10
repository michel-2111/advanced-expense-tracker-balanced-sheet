import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './DeleteDialog';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LiabilityMaster() {
    const [liabilities, setLiabilities] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', value: '', notes: '' });
    const [editId, setEditId] = useState(null);

    const fetchLiabilities = () => {
        axios.get('http://localhost:5000/api/liabilities')
            .then(res => setLiabilities(res.data))
            .catch(() => toast.error('Gagal memuat data liabilitas!'));
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    useEffect(() => { fetchLiabilities(); }, []);

    const handleSave = () => {
        if (editId) {
            axios.put(`http://localhost:5000/api/liabilities/${editId}`, form)
                .then(() => {
                    toast.success('Liabilitas berhasil diupdate!');
                    fetchLiabilities();
                    setOpen(false);
                    setEditId(null);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal update liabilitas!'));
        } else {
            axios.post('http://localhost:5000/api/liabilities', form)
                .then(() => {
                    toast.success('Liabilitas berhasil ditambahkan!');
                    fetchLiabilities();
                    setOpen(false);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal menambah liabilitas!'));
        }
    };

    const handleEdit = (liability) => {
        setEditId(liability.id);
        setForm({ name: liability.name, value: liability.value, notes: liability.notes || '' });
        setOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/api/liabilities/${selectedDeleteId}`)
            .then(() => {
                toast.success('Aset berhasil dihapus!');
                fetchLiabilities();
            })
            .catch(() => toast.error('Gagal menghapus aset!'))
            .finally(() => {
                setDeleteDialogOpen(false);
                setSelectedDeleteId(null);
            });
    };

    return (
        <Box sx={{ mt: 2 }}>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>Saldo Awal</TableCell>
                        <TableCell>Catatan</TableCell>
                        <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {liabilities.map(l => (
                        <TableRow key={l.id}>
                            <TableCell>{l.name}</TableCell>
                            <TableCell>{l.value}</TableCell>
                            <TableCell>{l.notes}</TableCell>
                            <TableCell align="center">
                                <IconButton size="small" onClick={() => handleEdit(l)}><EditIcon /></IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDeleteClick(liabilities.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" onClick={() => { setOpen(true); setEditId(null); setForm({ name: '', value: '', notes: '' }); }} sx={{ mb: 2, mt: 2 }}>
                Tambah Liabilitas
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Edit Liabilitas' : 'Tambah Liabilitas'}</DialogTitle>
                <DialogContent>
                    <TextField label="Nama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Saldo Awal" type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Catatan" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Batal</Button>
                    <Button onClick={handleSave} variant="contained">{editId ? 'Update' : 'Simpan'}</Button>
                </DialogActions>
            </Dialog>
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Liabilitas"
                message="Apakah kamu yakin ingin menghapus Liabilitas ini?"
            />
        </Box>
    );
}