import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useBreadcrumb } from '../../context/BreadcrumbContext';
import { useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {
    const { breadcrumbs } = useBreadcrumb();
    const navigate = useNavigate();

    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <Box sx={{ px: { xs: 2, md: 2 }, py: 2 }}>
            <MuiBreadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" color="disabled" />}
                sx={{ fontSize: { xs: 13, md: 15 }, '& .MuiBreadcrumbs-separator': { mx: 1 }, }}>
                {breadcrumbs.map((bc, idx) => {
                    if (idx === 0 && bc.label?.toLowerCase() === 'home') {
                        return (
                            <Link
                                key={bc.label}
                                underline="hover"
                                color="inherit"
                                onClick={() => navigate(bc.path)}
                                sx={{ display: 'flex', alignItems: 'center', fontWeight: 500, cursor: 'pointer' }}
                            >
                                <HomeRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {bc.label}
                            </Link>
                        );
                    }

                    if (idx === breadcrumbs.length - 1) {
                        return (
                            <Typography key={bc.label} color="primary" fontWeight={700} sx={{ fontSize: { xs: 14, md: 16 }, letterSpacing: 0.2 }}>
                                {bc.label}
                            </Typography>
                        );
                    }

                    return (
                        <Link key={bc.label} underline="hover" color="inherit" onClick={() => navigate(bc.path)}
                            sx={{ fontWeight: 500, cursor: 'pointer', fontSize: { xs: 13, md: 15 }, letterSpacing: 0.1 }} >
                            {bc.label}
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
        </Box>
    );
}
