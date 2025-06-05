// src/components/layout/MainLayout.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Box, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenSidebar = () => setSidebarOpen(true);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const handleLogout = () => {
    // (Opsional) Hapus token/session user di localStorage/cookies
    // localStorage.removeItem('token');
    navigate('/'); // Redirect ke halaman login
    };

return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
        <Header onMenuClick={handleOpenSidebar} onLogout={handleLogout} />
        <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
        {/* Tambah Toolbar agar offset konten di bawah AppBar fixed */}
        <Toolbar />
        <Box component="main" sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            mt: 1,
            minHeight: '80vh',
        }}>
            {children}
        </Box>
        <Footer />
        </Box>
    );
}