// src/components/layout/MainLayout.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

import { Box, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout({ children}) {
    const { role, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenSidebar = () => setSidebarOpen(true);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const handleLogout = () => {
    logout();
    navigate('/');
    };

return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
            <Header onMenuClick={handleOpenSidebar} onLogout={handleLogout} role={role} />
            <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} role={role} />
            <Toolbar />
            <Breadcrumbs />
            <Box component="main" sx={{flexGrow: 1,p: { xs: 2, md: 2 },mt: 1,minHeight: '80vh', }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}