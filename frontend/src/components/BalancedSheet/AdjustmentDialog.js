import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Alert } from '@mui/material';

const TYPES = [
    { value: 'asset', label: 'Aset' },
    { value: 'liability', label: 'Liabilitas' },
    { value: 'equity', label: 'Ekuitas' }
];

export default function AdjustmentDialog({ open, onClose, onSubmit }) {
    const [type, setType] = useState('asset');
    const [value, setValue] = useState('');
    const [notes, setNotes] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!value || isNaN(Number(value))) {
            setError('Nilai penyesuaian harus diisi dan berupa angka!');
            return;
        }
        setError('');
        onSubmit({ type, value: parseFloat(value), notes, user });
        setType('asset');
        setValue('');
        setNotes('');
        setUser('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Buat Adjustment Neraca</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    select
                    label="Tipe Penyesuaian"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    {TYPES.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Nilai Penyesuaian"
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Catatan"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="User"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Batal</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={!value}>Simpan</Button>
            </DialogActions>
        </Dialog>
    );
}