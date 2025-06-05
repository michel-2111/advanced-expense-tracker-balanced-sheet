import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';

export default function UMKMDashboard() {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Box minHeight="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
                    <Typography variant="h4" gutterBottom>
                    Selamat Datang, UMKM!
                    </Typography>
                    <Typography variant="body1" mb={4}>
                    Silakan pilih fitur yang ingin Anda gunakan:
                    </Typography>
                    <Box display="flex" gap={3} justifyContent="center">
                    <Button variant="contained" size="large" color="primary" onClick={() => navigate('/master-data')}>
                        Master Data Akun
                    </Button>
                    <Button variant="contained" size="large" color="secondary" onClick={() => navigate('/list')}>
                        Fitur Keuangan
                    </Button>
                    </Box>
                </Paper>
            </Box>
        </MainLayout>
    );
}
