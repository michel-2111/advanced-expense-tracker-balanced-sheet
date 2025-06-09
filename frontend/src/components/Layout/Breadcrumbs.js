import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material';
import { useBreadcrumb } from '../../context/BreadcrumbContext';
import { useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {
    const { breadcrumbs } = useBreadcrumb();
    const navigate = useNavigate();

    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <MuiBreadcrumbs sx={{ mb: 2, mt: 1 }}>
        {breadcrumbs.map((bc, idx) =>
            idx !== breadcrumbs.length - 1 ? (
            <Link
                key={bc.label}
                underline="hover"
                color="inherit"
                onClick={() => navigate(bc.path)}
                sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
                {bc.label}
            </Link>
            ) : (
            <Typography key={bc.label} color="text.primary" fontWeight={700}>
                {bc.label}
            </Typography>
            )
        )}
        </MuiBreadcrumbs>
    );
}
