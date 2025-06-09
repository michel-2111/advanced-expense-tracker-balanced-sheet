import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function DocumentFilterControls({
    filterStatus, setFilterStatus,
    sortField, setSortField,
    sortOrder, setSortOrder,
    searchQuery, setSearchQuery
    }) {
        
    const [showSearch, setShowSearch] = useState(false);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'space-between', mb: 2 }}>
        <FormControl sx={{ minWidth: 125 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Sent">Sent</MenuItem>
            <MenuItem value="Received">Received</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 125 }} size="small">
            <InputLabel>Sort based on</InputLabel>
            <Select
            value={sortField}
            label="Urutkan Berdasarkan"
            onChange={(e) => setSortField(e.target.value)}
            >
            <MenuItem value="title">Name</MenuItem>
            <MenuItem value="createdAt">Date</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 125 }} size="small">
            <InputLabel>Urutan</InputLabel>
            <Select
            value={sortOrder}
            label="Urutan"
            onChange={(e) => setSortOrder(e.target.value)}
            >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
            </Select>
        </FormControl>

        <IconButton
        color="secondary"
        onClick={() => {
            setFilterStatus('');
            setSortField('title');
            setSortOrder('asc');
            setSearchQuery('');
        }}
        title="Reset Filter"
        >
        <RestartAltIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        {showSearch ? (
            <TextField
            autoFocus
            variant="outlined"
            size="small"
            placeholder="Cari Judul"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => {
                if (searchQuery === '') setShowSearch(false); // tutup jika kosong
            }}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
                )
            }}
            />
        ) : (
            <IconButton onClick={() => setShowSearch(true)}>
            <SearchIcon />
            </IconButton>
        )}
        </Box>
        </Box>
    );
}