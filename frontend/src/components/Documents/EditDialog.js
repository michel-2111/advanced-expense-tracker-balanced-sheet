import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function EditDocumentDialog({ open, onClose, doc, onChange, onSave }) {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Dokumen</DialogTitle>
        <DialogContent>
            <TextField
            label="Judul Dokumen"
            fullWidth
            margin="normal"
            value={doc.title}
            onChange={(e) => onChange({ ...doc, title: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
                value={doc.status}
                label="Status"
                onChange={(e) => onChange({ ...doc, status: e.target.value })}
            >
                <MenuItem value="Sent">Sent</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
            </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button onClick={onSave} variant="contained" color="primary">Simpan</Button>
        </DialogActions>
        </Dialog>
    );
}