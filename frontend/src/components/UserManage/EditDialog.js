import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

export default function EditDialog({ open, onClose, onSave, form, setForm }) {
    return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ minWidth: 320 }}>
            <TextField
                margin="normal"
                label="Email"
                fullWidth
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoFocus
            />
            <TextField
                margin="normal"
                select
                label="Role"
                fullWidth
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                SelectProps={{ native: true }}
            >
                <option value="umkm">UMKM</option>
                <option value="admin">Admin</option>
            </TextField>
        </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={onSave} variant="contained">Simpan</Button>
    </DialogActions>
    </Dialog>
    );
}
