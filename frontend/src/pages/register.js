import { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button, MenuItem, Paper, Box } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PageTransition from "../components/Layout/PageTransition";

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', role: '' })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleRegister = async () => {
        setLoading(true)
        try {
            await axios.post('http://localhost:5000/api/auth/register', form)
            setSuccessMsg('Registrasi berhasil, silakan login!');
            setSuccessOpen(true);
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            setErrorMsg(
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            'Registrasi gagal! Email atau password salah.'
            );
            setSnackbarOpen(true);
        } finally {
            setLoading(false)
        }
    }

return (
    <PageTransition>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <Paper elevation={6} sx={{ minWidth: 400, px: 5, py: 5, borderRadius: 3, boxShadow: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <PersonAddAlt1Icon color="primary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h4" fontWeight={700} mb={2}>Daftar Akun</Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successOpen}
                autoHideDuration={2000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    {successMsg}
                </Alert>
            </Snackbar>
            </Box>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                <TextField
                    select
                    label="Role"
                    fullWidth
                    margin="normal"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                    <MenuItem value="umkm">UMKM</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, fontWeight: 700 }}
                    onClick={handleRegister}
                    disabled={loading}
                    >
                    {loading ? 'Mendaftar...' : 'DAFTAR'}
                    </Button>
                <Typography align="center" sx={{ mt: 2, fontSize: 14, color: "text.secondary" }}>
                    Sudah punya akun? <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/")}>Login di sini</span>
                    </Typography>
        </Paper>
    </Box>
    </PageTransition>
    )
}
