import { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', role: '' })
    const navigate = useNavigate()

    const handleRegister = async () => {
    try {
        await axios.post('http://localhost:5000/api/auth/register', form)
        alert('Registrasi berhasil, silakan login!')
        navigate('/')
    } catch (err) {
        alert('Registrasi gagal: ' + err.response?.data?.error || 'Terjadi kesalahan')
    }
}

return (
    <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Daftar Akun</Typography>

    <TextField
        label="Username"
        fullWidth margin="normal"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <TextField
        label="Password"
        type="password"
        fullWidth margin="normal"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <TextField
        select
        label="Role"
        fullWidth margin="normal"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
    >
        <MenuItem value="umkm">UMKM</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
    </TextField>

    <Button variant="contained" color="primary" onClick={handleRegister}>Daftar</Button>
    </Container>
)}
