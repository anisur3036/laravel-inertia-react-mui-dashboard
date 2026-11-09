import { CheckCircleRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { AppLogo } from '@/components/app-logo';
import { ThemeToggle } from '@/components/navbar/theme-toggle';

const highlights = [
    'Collapsible, multi-level navigation',
    'Light and dark themes that remember your choice',
    'Built for keyboard and screen reader users',
];

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                minHeight: '100dvh',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                bgcolor: 'background.default',
            }}
        >
            <Box
                component="aside"
                aria-label="About Nimbus"
                sx={(theme) => ({
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 6,
                    color: 'common.white',
                    background: `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.secondary.main, 0.55)}, transparent 55%), linear-gradient(145deg, #312e81, #4f46e5 55%, #0ea5e9)`,
                })}
            >
                <AppLogo />
                <Box>
                    <Typography
                        variant="h4"
                        component="p"
                        sx={{ mb: 2, maxWidth: 440 }}
                    >
                        Everything your team needs, in one calm workspace.
                    </Typography>
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: 'none', p: 0, m: 0 }}
                    >
                        {highlights.map((highlight) => (
                            <Box
                                component="li"
                                key={highlight}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.25,
                                    opacity: 0.92,
                                }}
                            >
                                <CheckCircleRounded
                                    fontSize="small"
                                    aria-hidden
                                />
                                {highlight}
                            </Box>
                        ))}
                    </Stack>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    © {new Date().getFullYear()} Nimbus
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2, sm: 4 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: { md: 'none' } }}>
                        <AppLogo />
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <ThemeToggle />
                    </Box>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        display: 'grid',
                        placeItems: 'center',
                        py: 4,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 420 }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    );
}
