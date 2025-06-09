import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext'; // sesuaikan path

export default function Header({ onMenuClick, onLogout }) {
    const { role } = useAuth();
    return (
        <AppBar position="fixed" color="primary" elevation={1}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    e-UMKM
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    <Typography variant="body2" sx={{ display: 'inline', mr: 2 }}>
                        {role === 'admin' ? 'Admin' : 'UMKM'}
                    </Typography>
                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={onLogout}
                        sx={{ ml: 2 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
