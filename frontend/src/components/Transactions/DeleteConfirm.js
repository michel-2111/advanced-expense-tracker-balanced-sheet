import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function TransactionDeleteConfirm({ open, onClose, onConfirm, transaction }) {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Konfirmasi Hapus Transaksi</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Apakah Anda yakin ingin menghapus transaksi ini?
            <br /><br />
            <strong>Jenis:</strong> {transaction?.type}<br />
            <strong>Jumlah:</strong> Rp{transaction?.amount}<br />
            <strong>Kategori:</strong> {transaction?.category}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="inherit">
            Batal
            </Button>
            <Button onClick={onConfirm} color="error" variant="contained">
            Hapus
            </Button>
        </DialogActions>
        </Dialog>
    );
}