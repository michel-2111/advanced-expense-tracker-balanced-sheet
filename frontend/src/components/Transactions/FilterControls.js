import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, TextField } from '@mui/material';
import { RestartAlt, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const PERIOD_OPTIONS = [
    { label: 'Semua', value: '' },{ label: 'Minggu ini', value: 'week' },{ label: 'Bulan ini', value: 'month' },{ label: 'Custom', value: 'custom' }
];

export default function TransactionFilterControls({ onFilter }) {
    const [amountRange, setAmountRange] = useState('');
    const [sortAsc, setSortAsc] = useState(true); // default ascending
    const [period, setPeriod] = useState('');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const [type, setType] = useState('');

    const applyFilter = (range = amountRange, asc = sortAsc, per = period, start = customStart, end = customEnd, t = type) => {
        const filter = {
            amountRange: range,
            sortOrder: asc ? 'asc' : 'desc',
            period: per,
            type: t,
        };
        if (per === 'custom' && start && end) {
            filter.startDate = start;   // Sesuai backend
            filter.endDate = end;
        }
        onFilter(filter);
    };

    const handleAmountChange = (e) => {
        const newRange = e.target.value;
        setAmountRange(newRange);
        applyFilter(newRange, sortAsc, period, customStart, customEnd);
    };

    const toggleSort = () => {
        const newSort = !sortAsc;
        setSortAsc(newSort);
        applyFilter(amountRange, newSort, period, customStart, customEnd);
    };

    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;
        setPeriod(newPeriod);
        if (newPeriod !== 'custom') {
            setCustomStart('');
            setCustomEnd('');
            applyFilter(amountRange, sortAsc, newPeriod, '', '');
        }
    };

    const handleCustomStart = (e) => {
        setCustomStart(e.target.value);
        if (customEnd && e.target.value) {
            applyFilter(amountRange, sortAsc, 'custom', e.target.value, customEnd);
        }
    };

    const handleCustomEnd = (e) => {
        setCustomEnd(e.target.value);
        if (customStart && e.target.value) {
            applyFilter(amountRange, sortAsc, 'custom', customStart, e.target.value);
        }
    };

    const handleReset = () => {
        setAmountRange('');
        setSortAsc(true);
        setPeriod('');
        setCustomStart('');
        setCustomEnd('');
        onFilter({});
    };

    useEffect(() => {
        applyFilter('', true, '', '', '');
    }, []);

    return (
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mt={2} mb={2}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Jumlah</InputLabel>
                <Select value={amountRange} label="Jumlah" onChange={handleAmountChange}>
                    <MenuItem value="">Semua</MenuItem>
                    <MenuItem value="<100000">&lt; Rp100.000</MenuItem>
                    <MenuItem value="100000-500000">Rp100.000 - Rp500.000</MenuItem>
                    <MenuItem value=">500000">&gt; Rp500.000</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Jenis</InputLabel>
                <Select
                    value={type || ''}
                    label="Jenis"
                    onChange={e => {
                    setType(e.target.value);
                    applyFilter(amountRange, sortAsc, period, customStart, customEnd, e.target.value);
                    }}
                >
                    <MenuItem value="">Semua</MenuItem>
                    <MenuItem value="income">Pemasukan</MenuItem>
                    <MenuItem value="expense">Pengeluaran</MenuItem>
                </Select>
            </FormControl>
            {/* Filter Periode */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Periode</InputLabel>
                <Select value={period} label="Periode" onChange={handlePeriodChange}>
                    {PERIOD_OPTIONS.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {period === 'custom' && (
                <>
                    <TextField
                        type="date"
                        size="small"
                        value={customStart}
                        onChange={handleCustomStart}
                        sx={{ minWidth: 140 }}
                        label="Dari"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        type="date"
                        size="small"
                        value={customEnd}
                        onChange={handleCustomEnd}
                        sx={{ minWidth: 140 }}
                        label="Sampai"
                        InputLabelProps={{ shrink: true }}
                    />
                </>
            )}

            <IconButton onClick={toggleSort} title="Urutkan">
                {sortAsc ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
            </IconButton>

            <IconButton onClick={handleReset} title="Reset Filter" sx={{ color: 'purple' }}>
                <RestartAlt fontSize="small" />
            </IconButton>
        </Box>
    );
}