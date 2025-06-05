import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EquityMaster() {
    const [equities, setEquities] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', value: '', notes: '' });
    const [editId, setEditId] = useState(null);

    const fetchEquities = () => {
        axios.get('http://localhost:5000/api/equities')
            .then(res => setEquities(res.data))
            .catch(() => toast.error('Gagal memuat data ekuitas!'));
    };

    useEffect(() => { fetchEquities(); }, []);

    const handleSave = () => {
        if (editId) {
            axios.put(`http://localhost:5000/api/equities/${editId}`, form)
                .then(() => {
                    toast.success('Ekuitas berhasil diupdate!');
                    fetchEquities();
                    setOpen(false);
                    setEditId(null);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal update ekuitas!'));
        } else {
            axios.post('http://localhost:5000/api/equities', form)
                .then(() => {
                    toast.success('Ekuitas berhasil ditambahkan!');
                    fetchEquities();
                    setOpen(false);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal menambah ekuitas!'));
        }
    };

    const handleEdit = (equity) => {
        setEditId(equity.id);
        setForm({ name: equity.name, value: equity.value, notes: equity.notes || '' });
        setOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus akun ini?')) {
            axios.delete(`http://localhost:5000/api/equities/${id}`)
                .then(() => {
                    toast.success('Ekuitas berhasil dihapus!');
                    fetchEquities();
                })
                .catch(() => toast.error('Gagal menghapus ekuitas!'));
        }
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
                    {equities.map(eq => (
                        <TableRow key={eq.id}>
                            <TableCell>{eq.name}</TableCell>
                            <TableCell>{eq.value}</TableCell>
                            <TableCell>{eq.notes}</TableCell>
                            <TableCell align="center">
                                <IconButton size="small" onClick={() => handleEdit(eq)}><EditIcon /></IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDelete(eq.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" onClick={() => { setOpen(true); setEditId(null); setForm({ name: '', value: '', notes: '' }); }} sx={{ mb: 2, mt: 2 }}>
                Tambah Ekuitas
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Edit Ekuitas' : 'Tambah Ekuitas'}</DialogTitle>
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
        </Box>
    );
}