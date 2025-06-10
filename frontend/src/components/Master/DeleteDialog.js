import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function DeleteDialog({ open, onClose, onConfirm, title = "Hapus Data", message = "Apakah kamu yakin ingin menghapus data ini?" }) {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button onClick={onConfirm} variant="contained" color="error">Hapus</Button>
        </DialogActions>
        </Dialog>
    );
}
