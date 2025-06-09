// src/pages/Login.js
import { useState } from 'react'
import axios from 'axios'
import { Typography, TextField, Button, Box, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LockIcon from '@mui/icons-material/Lock';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PageTransition from "../components/Layout/PageTransition";


export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const { login } = useAuth()
    const [errorMsg, setErrorMsg] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form)
            login(res.data.token, res.data.role) // <-- Context
            res.data.role === 'admin' ? navigate('/admin') : navigate('/home')
        } catch {
            setErrorMsg('Login gagal! Email atau password salah.');
            setSnackbarOpen(true);
        }
    }

    return (
        <PageTransition>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <Paper elevation={6} sx={{ minWidth: 400, px: 5, py: 5, borderRadius: 3, boxShadow: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <LockIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h4" fontWeight={700} mb={2}>Login</Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMsg}
                </Alert>
            </Snackbar>
            </Box>
            <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2, fontWeight: 700 }}>
            LOGIN
            </Button>
            <Typography align="center" sx={{ mt: 2, fontSize: 14, color: "text.secondary" }}>
            Belum punya akun? <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/register")}>Daftar di sini</span>
            </Typography>
        </Paper>
        </Box>
        </PageTransition>
    )
}