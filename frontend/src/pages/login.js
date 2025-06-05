import { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()

const handleLogin = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', form)
        localStorage.setItem('token', res.data.token)
        res.data.role === 'admin' ? navigate('/admin') : navigate('/home')
    } catch {
        alert('Login gagal')
    }
}

return (
    <Container>
        <Typography variant="h4">Login</Typography>
    <TextField
        label="Username"
        fullWidth
        margin="normal"
        onChange={e => setForm({ ...form, email: e.target.value })}
        />
    <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={e => setForm({ ...form, password: e.target.value })}
    />
    <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
    </Button>

    <Typography sx={{ mt: 2 }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
    </Typography>
    </Container>
)}
