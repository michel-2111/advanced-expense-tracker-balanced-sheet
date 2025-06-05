import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button onClick={onConfirm} color="error" variant="contained">Hapus</Button>
        </DialogActions>
        </Dialog>
    );
}