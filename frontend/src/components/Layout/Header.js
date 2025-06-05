import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ onMenuClick, onLogout }) {
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
            UMKM Finance
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
            {/* Bisa ganti dengan avatar dan dropdown jika ada user profile */}
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