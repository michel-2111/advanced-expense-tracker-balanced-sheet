import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Alert, Button } from '@mui/material';

// Helper untuk format rupiah
function formatRupiah(value) {
    return value?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || '-';
}

export default function BalanceSheetView({
    assets = [],
    liabilities = [],
    equities = [],
    totalAssets = 0,
    totalLiabilities = 0,
    totalEquities = 0,
    onAdjustmentClick = () => {}
}) {
    return (
        <>
            <Typography variant="h5" align="center" gutterBottom>
                Neraca UMKM (Balance Sheet)
            </Typography>
            <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'flex-start',gap: { xs: 2, md: 5 },flexWrap: { xs: 'wrap', md: 'nowrap' },mt: 3,mb: 2}}>
                {/* Kolom Aset */}
                <Box sx={{ minWidth: 240, flex: 1 }}>
                    <Typography variant="h6" align="center" color="success.main">Aset</Typography>
                    <List dense>
                        {assets.map(a => (
                            <ListItem key={a.id} disablePadding>
                                <ListItemText
                                    primary={a.name}
                                    secondary={a.notes}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.85rem' }}
                                />
                                <Typography variant="body1">{formatRupiah(a.value)}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <Typography variant="subtitle1" align="right">
                        <b>Total Aset:</b> {formatRupiah(totalAssets)}
                    </Typography>
                </Box>

                {/* Divider Vertikal */}
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, bgcolor: "#e0e0e0", mx: 2, display: { xs: 'none', md: 'block' } }} />

                {/* Kolom Liabilitas */}
                <Box sx={{ minWidth: 240, flex: 1 }}>
                    <Typography variant="h6" align="center" color="error.main">Liabilitas</Typography>
                    <List dense>
                        {liabilities.map(l => (
                            <ListItem key={l.id} disablePadding>
                                <ListItemText
                                    primary={l.name}
                                    secondary={l.notes}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.85rem' }}
                                />
                                <Typography variant="body1">{formatRupiah(l.value)}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <Typography variant="subtitle1" align="right">
                        <b>Total Liabilitas:</b> {formatRupiah(totalLiabilities)}
                    </Typography>
                </Box>

                {/* Divider Vertikal */}
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, bgcolor: "#e0e0e0", mx: 2, display: { xs: 'none', md: 'block' } }} />

                {/* Kolom Ekuitas */}
                <Box sx={{ minWidth: 240, flex: 1 }}>
                    <Typography variant="h6" align="center" color="primary.main">Ekuitas</Typography>
                    <List dense>
                        {equities.map(e => (
                            <ListItem key={e.id} disablePadding>
                                <ListItemText
                                    primary={e.name}
                                    secondary={e.notes}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.85rem' }}
                                />
                                <Typography variant="body1">{formatRupiah(e.value)}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <Typography variant="subtitle1" align="right">
                        <b>Total Ekuitas:</b> {formatRupiah(totalEquities)}
                    </Typography>
                </Box>
            </Box>

            {/* Rumus dan alert */}
            <Box mt={3} p={2} sx={{ background: '#f5f5f5', borderRadius: 2 }}>
                <Typography align="center" variant="subtitle2">
                    <b>Rumus Neraca:</b> <span style={{ color: '#388e3c' }}>Aset</span> = <span style={{ color: '#d32f2f' }}>Liabilitas</span> + <span style={{ color: '#1976d2' }}>Ekuitas</span>
                </Typography>
                <Typography align="center" variant="body2" mt={1}>
                    <span style={{ color: '#388e3c' }}>{formatRupiah(totalAssets)}</span> = <span style={{ color: '#d32f2f' }}>{formatRupiah(totalLiabilities)}</span> + <span style={{ color: '#1976d2' }}>{formatRupiah(totalEquities)}</span>
                </Typography>
            </Box>
            {totalAssets !== totalLiabilities + totalEquities && (
                <Alert severity="error" sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.1rem' }} icon={false}>
                    ⚠️ Neraca tidak seimbang!<br />
                    Selisih: <b>{formatRupiah(totalAssets - (totalLiabilities + totalEquities))}</b><br />
                    Silakan lakukan penyesuaian (Adjustment) untuk menyeimbangkan neraca.
                </Alert>
            )}

            {/* Tombol Adjustment */}
            <Box textAlign="center" mb={2} mt={4}>
                <Button variant="contained" color="warning" onClick={onAdjustmentClick}>
                    Buat Adjustment Neraca
                </Button>
            </Box>
        </>
    );
}