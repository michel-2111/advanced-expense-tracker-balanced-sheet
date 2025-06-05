// src/components/layout/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ p: 2, background: '#f5f5f5', mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} M-UMKM. All rights reserved.
        </Typography>
        </Box>
    );
}