import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BalanceSheetView from '../components/BalancedSheet/BalanceSheetView';
import AdjustmentDialog from '../components/BalancedSheet/AdjustmentDialog';
import AdjustmentHistory from '../components/BalancedSheet/AdjustmentHistory';
import MainLayout from '../components/Layout/MainLayout';
import { Fab, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function BalanceSheet() {
    const [assets, setAssets] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [equities, setEquities] = useState([]);
    const [adjustmentOpen, setAdjustmentOpen] = useState(false);
    const [adjustments, setAdjustments] = useState([]);
    const navigate = useNavigate();

    // ==== Tambahan state untuk summary ====
    const [summary, setSummary] = useState({
        asset: 0,
        liability: 0,
        equity: 0,
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/assets').then(res => setAssets(res.data));
        axios.get('http://localhost:5000/api/liabilities').then(res => setLiabilities(res.data));
        axios.get('http://localhost:5000/api/equities').then(res => setEquities(res.data));
        axios.get('http://localhost:5000/api/adjustments').then(res => setAdjustments(res.data));
        // ==== Fetch summary otomatis ====
        axios.get('http://localhost:5000/api/balance-summary').then(res => setSummary(res.data));
    }, []);

    const handleSubmitAdjustment = (data) => {
        axios.post('http://localhost:5000/api/adjustments', data).then(() => {
            axios.get('http://localhost:5000/api/adjustments').then(res => setAdjustments(res.data));
            // ==== Re-fetch summary jika ada adjustment ====
            axios.get('http://localhost:5000/api/balance-summary').then(res => setSummary(res.data));
            toast.success('Penyesuaian berhasil dibuat 👍');
        });
    };

    return (
        <MainLayout>
            <Paper elevation={4} sx={{ p: 4, mb: 4, maxWidth: 1200, mx: 'auto' }}>
                <BalanceSheetView
                    assets={assets}
                    liabilities={liabilities}
                    equities={equities}
                    // ==== Gunakan hasil summary ====
                    totalAssets={summary.asset}
                    totalLiabilities={summary.liability}
                    totalEquities={summary.equity}
                    onAdjustmentClick={() => setAdjustmentOpen(true)}
                />
                <AdjustmentDialog
                    open={adjustmentOpen}
                    onClose={() => setAdjustmentOpen(false)}
                    onSubmit={handleSubmitAdjustment}
                />
                <AdjustmentHistory adjustments={adjustments} />
            </Paper>
            <div style={{ position: 'relative' }}>
                <Tooltip title="Kembali" placement="right">
                    <Fab
                    color="primary"
                    size="medium"
                    onClick={() => navigate('/list')}
                    sx={{position: 'fixed', bottom: 32, left: 32, zIndex: 999,boxShadow: 3}}>
                    <ArrowBackIcon />
                    </Fab>
                </Tooltip>
            </div>
        </MainLayout>
    );
}
