import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Typography } from '@mui/material';

export default function DocumentUploadForm({ title, setTitle, file, setFile, status, setStatus, handleUpload }) {
    return (
        <>
        <Typography variant="h6" gutterBottom>Document Archive</Typography>

        <TextField
            label="Judul Dokumen"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
            >
            <MenuItem value="Sent">Sent</MenuItem>
            <MenuItem value="Received">Received</MenuItem>
            </Select>
        </FormControl>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        
        <Button variant="contained" onClick={handleUpload} sx={{ mt: 2 }}>
            UPLOAD
        </Button>
        </>
    );
}