// src/components/layout/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // sesuaikan path

const menuUMKM = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
    { label: 'Master Data', icon: <FolderIcon />, path: '/master-data' },
    { label: 'Keuangan', icon: <AccountBalanceIcon />, path: '/list' },
];

const menuAdmin = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
    { label: 'Arsip', icon: <ArchiveIcon />, path: '/admin' },
    { label: 'Master Data', icon: <FolderIcon />, path: '/master-data' },
    { label: 'Keuangan', icon: <AccountBalanceIcon />, path: '/list' },
    { label: 'Kelola User', icon: <PeopleIcon />, path: '/admin/users' },
];

export default function Sidebar({ open, onClose }) {
    const navigate = useNavigate();
    const { role } = useAuth();

    const handleMenuClick = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    // Pilih menu sesuai role
    const menu = role === 'admin' ? menuAdmin : menuUMKM;

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ mt: 2, mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                UMKM Finance
            </Box>
            <Divider />
            <List>
                {menu.map(item => (
                    <ListItem button key={item.label} onClick={() => handleMenuClick(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
