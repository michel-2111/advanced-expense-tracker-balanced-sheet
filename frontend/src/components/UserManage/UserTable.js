import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  Paper, Tooltip, Chip, Box, Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function formatRole(role) {
    const color = role === 'admin' ? 'primary' : 'success';
    return <Chip label={role} color={color} size="small" sx={{ textTransform: 'capitalize' }} />;
}

export default function UserTable({ users, onEdit, onDelete }) {
    return (
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', mt: 1 }}>
        <Table sx={{ minWidth: 600 }}>
            <TableHead>
            <TableRow sx={{ background: '#f7f7fa' }}>
                <TableCell align="center" sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Created At</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Aksi</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.length === 0 ? (
                <TableRow>
                <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary" sx={{ py: 4 }}>Belum ada user.</Typography>
                </TableCell>
                </TableRow>
            ) : (
                users.map((user, idx) => (
                <TableRow key={user.id} hover>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">
                    <Typography sx={{ fontWeight: 500 }}>{user.email}</Typography>
                    </TableCell>
                    <TableCell align="center">{formatRole(user.role)}</TableCell>
                    <TableCell align="center">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit", month: "short", year: "numeric"
                    })} <br />
                    <Typography variant="caption" color="text.secondary">
                        {new Date(user.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                    </TableCell>
                    <TableCell align="center">
                    <Tooltip title="Edit User">
                        <IconButton color="primary" onClick={() => onEdit(user)}>
                        <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus User">
                        <IconButton color="error" onClick={() => onDelete(user.id)}>
                        <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
    </Paper>
    );
}
