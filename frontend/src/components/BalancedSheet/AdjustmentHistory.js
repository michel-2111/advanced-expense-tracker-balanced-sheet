import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function formatRupiah(value) {
  return value?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || '-';
}

export default function AdjustmentHistory({ adjustments }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>Riwayat Adjustment Neraca</Typography>
      <List dense>
        {adjustments.map(adj => (
          <ListItem key={adj.id} sx={{ borderBottom: '1px solid #eee' }}>
            <ListItemText
              primary={`${adj.type.charAt(0).toUpperCase() + adj.type.slice(1)}: ${formatRupiah(adj.value)}`}
              secondary={
                <>
                  {adj.notes && <span>Catatan: {adj.notes}. </span>}
                  {adj.user && <span>User: {adj.user}. </span>}
                  {new Date(adj.createdAt).toLocaleString('id-ID')}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}