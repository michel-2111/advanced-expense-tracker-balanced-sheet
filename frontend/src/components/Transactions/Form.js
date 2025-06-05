import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TransactionForm({ form, setForm, onSubmit, loading }) {
    const [assets, setAssets] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [equities, setEquities] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);

    useEffect(() => {
        setLoadingAccounts(true);
        Promise.all([
            axios.get('http://localhost:5000/api/assets'),
            axios.get('http://localhost:5000/api/liabilities'),
            axios.get('http://localhost:5000/api/equities'),
        ]).then(([resAssets, resLiab, resEq]) => {
            setAssets(resAssets.data);
            setLiabilities(resLiab.data);
            setEquities(resEq.data);
        }).finally(() => setLoadingAccounts(false));
    }, []);

    const isAccountSelected =
        (form.impact === 'asset' && form.assetId) ||
        (form.impact === 'liability' && form.liabilityId) ||
        (form.impact === 'equity' && form.equityId);

    const noMasterData =
        (form.impact === 'asset' && assets.length === 0) ||
        (form.impact === 'liability' && liabilities.length === 0) ||
        (form.impact === 'equity' && equities.length === 0);

    const navigate = useNavigate();

    return (
        <>
            <TextField
                label="Jenis"
                select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                fullWidth
                margin="normal">
                <MenuItem value="income">Pemasukan</MenuItem>
                <MenuItem value="expense">Pengeluaran</MenuItem>
            </TextField>

            <TextField
                label="Jumlah"
                type="number"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                fullWidth
                margin="normal"/>
            <TextField
                label="Kategori"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                fullWidth
                margin="normal"/>
            <TextField
                label="Catatan"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                fullWidth
                margin="normal"/>
            <TextField
                label="Posisi"
                select
                value={form.impact || ''}
                onChange={e =>
                    setForm({
                        ...form,
                        impact: e.target.value,
                        assetId: null,
                        liabilityId: null,
                        equityId: null,
                    })
                }
                fullWidth
                margin="normal">
                <MenuItem value="asset">Aset</MenuItem>
                <MenuItem value="liability">Liabilitas</MenuItem>
                <MenuItem value="equity">Ekuitas</MenuItem>
            </TextField>
            
            {/* Dropdown akun, tampilkan loading saat loading */}
            {loadingAccounts && (
                <Box display="flex" justifyContent="center" my={2}>
                    <CircularProgress size={24} />
                </Box>
            )}

            {form.impact === 'asset' && (
                <TextField
                    select
                    label="Pilih Aset"
                    value={form.assetId || ''}
                    onChange={e =>
                        setForm({
                            ...form,
                            assetId: Number(e.target.value),
                            liabilityId: null,
                            equityId: null,
                        })
                    }
                    fullWidth
                    margin="normal"
                    required>
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

            {form.impact === 'liability' && (
                <TextField
                    select
                    label="Pilih Liabilitas"
                    value={form.liabilityId || ''}
                    onChange={e =>
                        setForm({
                            ...form,
                            liabilityId: Number(e.target.value),
                            assetId: null,
                            equityId: null,
                        })
                    }
                    fullWidth
                    margin="normal"
                    required>
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

            {form.impact === 'equity' && (
                <TextField
                    select
                    label="Pilih Ekuitas"
                    value={form.equityId || ''}
                    onChange={e =>
                        setForm({
                            ...form,
                            equityId: Number(e.target.value),
                            assetId: null,
                            liabilityId: null,
                        })
                    }
                    fullWidth
                    margin="normal"
                    required>
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
            <Box
                sx={{
                    mt: 2,mb: 4,display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',gap: 2
                }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    disabled={noMasterData || loading || !isAccountSelected}
                    sx={{ minWidth: 180, fontWeight: 'bold' }}>
                    {loading ? 'Menyimpan...' : 'Tambah Transaksi'}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/list')}
                    sx={{ minWidth: 180, fontWeight: 'bold' }}>
                    Lihat Transaksi
                </Button>
            </Box>
            {noMasterData && (
                <Alert severity="warning" sx={{ my: 2 }}>
                    Data master pada kategori ini masih kosong. Silakan tambah akun di menu Master Data sebelum input transaksi!
                </Alert>
            )}
        </>
    );
}