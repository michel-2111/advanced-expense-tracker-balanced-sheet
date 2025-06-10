import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function DocumentUploadForm({ title, setTitle, file, setFile, status, setStatus, handleUpload }) {
    return (
        <>
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

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginRight: 12 }}
            />
            <Button variant="contained" onClick={handleUpload} sx={{ minWidth: 110, fontWeight: 700 }} startIcon={<UploadFileIcon />}>
                UPLOAD
            </Button>
        </Box>
        </>
    );
}