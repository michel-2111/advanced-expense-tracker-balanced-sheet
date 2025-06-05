import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const types = [
    { label: 'Pemasukan', value: 'income' },
    { label: 'Pengeluaran', value: 'expense' }
];

export default function TransactionEditDialog({ open, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        category: '',
        notes: '',
        impact: '', // posisi: asset, liability, equity
        assetId: '',
        liabilityId: '',
        equityId: ''
    });

    const [assets, setAssets] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [equities, setEquities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch master data
    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get('http://localhost:5000/api/assets'),
            axios.get('http://localhost:5000/api/liabilities'),
            axios.get('http://localhost:5000/api/equities')
        ]).then(([a, l, e]) => {
            setAssets(a.data || []);
            setLiabilities(l.data || []);
            setEquities(e.data || []);
        }).finally(() => setLoading(false));
    }, []);

    // Set initial data to form
    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type || '',
                amount: initialData.amount || '',
                category: initialData.category || '',
                notes: initialData.notes || '',
                impact: initialData.impact || '',
                assetId: initialData.assetId || '',
                liabilityId: initialData.liabilityId || '',
                equityId: initialData.equityId || ''
            });
        }
    }, [initialData, open]); // reset formData setiap open baru

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImpactChange = (e) => {
        setFormData({
            ...formData,
            impact: e.target.value,
            assetId: '',
            liabilityId: '',
            equityId: ''
        });
    };

    const handleAccountChange = (type, value) => {
        setFormData({
            ...formData,
            assetId: type === 'asset' ? value : '',
            liabilityId: type === 'liability' ? value : '',
            equityId: type === 'equity' ? value : ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    // Disable SIMPAN jika posisi belum dipilih atau akun belum dipilih
    const isAccountSelected =
        (formData.impact === 'asset' && formData.assetId) ||
        (formData.impact === 'liability' && formData.liabilityId) ||
        (formData.impact === 'equity' && formData.equityId);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Transaksi</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        fullWidth
                        select
                        label="Jenis Transaksi"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Jumlah"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Kategori"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Catatan"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        select
                        label="Posisi"
                        name="impact"
                        value={formData.impact}
                        onChange={handleImpactChange}
                        required
                    >
                        <MenuItem value="asset">Aset</MenuItem>
                        <MenuItem value="liability">Liabilitas</MenuItem>
                        <MenuItem value="equity">Ekuitas</MenuItem>
                    </TextField>

                    {/* Dropdown Akun Master */}
                    {formData.impact === 'asset' && (
                        <TextField
                            select
                            margin="dense"
                            fullWidth
                            label="Pilih Aset"
                            value={formData.assetId}
                            onChange={e => handleAccountChange('asset', e.target.value)}
                            required
                        >
                            {assets.length === 0 ? (
                                <MenuItem disabled value="">
                                    (Belum ada data aset, tambah dulu di Master Data)
                                </MenuItem>
                            ) : (
                                assets.map(a => (
                                    <MenuItem key={a.id} value={a.id}>
                                        {a.name}
                                    </MenuItem>
                                ))
                            )}
                        </TextField>
                    )}
                    {formData.impact === 'liability' && (
                        <TextField
                            select
                            margin="dense"
                            fullWidth
                            label="Pilih Liabilitas"
                            value={formData.liabilityId}
                            onChange={e => handleAccountChange('liability', e.target.value)}
                            required
                        >
                            {liabilities.length === 0 ? (
                                <MenuItem disabled value="">
                                    (Belum ada data liabilitas, tambah dulu di Master Data)
                                </MenuItem>
                            ) : (
                                liabilities.map(l => (
                                    <MenuItem key={l.id} value={l.id}>
                                        {l.name}
                                    </MenuItem>
                                ))
                            )}
                        </TextField>
                    )}
                    {formData.impact === 'equity' && (
                        <TextField
                            select
                            margin="dense"
                            fullWidth
                            label="Pilih Ekuitas"
                            value={formData.equityId}
                            onChange={e => handleAccountChange('equity', e.target.value)}
                            required
                        >
                            {equities.length === 0 ? (
                                <MenuItem disabled value="">
                                    (Belum ada data ekuitas, tambah dulu di Master Data)
                                </MenuItem>
                            ) : (
                                equities.map(eq => (
                                    <MenuItem key={eq.id} value={eq.id}>
                                        {eq.name}
                                    </MenuItem>
                                ))
                            )}
                        </TextField>
                    )}

                    {/* Kosongkan space agar tombol di DialogActions saja */}
                    <Box sx={{ height: 8 }} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Batal</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isAccountSelected || loading}
                >
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    );
}