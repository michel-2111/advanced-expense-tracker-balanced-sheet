import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './DeleteDialog';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AssetMaster() {
    const [assets, setAssets] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', value: '', notes: '' });
    const [editId, setEditId] = useState(null);

    const fetchAssets = () => {
        axios.get('http://localhost:5000/api/assets')
            .then(res => setAssets(res.data))
            .catch(() => toast.error('Gagal memuat data aset!'));
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    useEffect(() => { fetchAssets(); }, []);

    const handleSave = () => {
        if (editId) {
            axios.put(`http://localhost:5000/api/assets/${editId}`, form)
                .then(() => {
                    toast.success('Aset berhasil diupdate!');
                    fetchAssets();
                    setOpen(false);
                    setEditId(null);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal update aset!'));
        } else {
            axios.post('http://localhost:5000/api/assets', form)
                .then(() => {
                    toast.success('Aset berhasil ditambahkan!');
                    fetchAssets();
                    setOpen(false);
                    setForm({ name: '', value: '', notes: '' });
                })
                .catch(() => toast.error('Gagal menambah aset!'));
        }
    };

    const handleEdit = (asset) => {
        setEditId(asset.id);
        setForm({ name: asset.name, value: asset.value, notes: asset.notes || '' });
        setOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/api/assets/${selectedDeleteId}`)
            .then(() => {
                toast.success('Aset berhasil dihapus!');
                fetchAssets();
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
                    {assets.map(asset => (
                        <TableRow key={asset.id}>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>{asset.value}</TableCell>
                            <TableCell>{asset.notes}</TableCell>
                            <TableCell align="center">
                                <IconButton size="small" onClick={() => handleEdit(asset)}><EditIcon /></IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDeleteClick(asset.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" onClick={() => { setOpen(true); setEditId(null); setForm({ name: '', value: '', notes: '' }); }} sx={{ mb: 2, mt: 2 }}>
                Tambah Aset
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Edit Aset' : 'Tambah Aset'}</DialogTitle>
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
                title="Hapus Aset"
                message="Apakah kamu yakin ingin menghapus aset ini?"
            />
        </Box>
    );
}