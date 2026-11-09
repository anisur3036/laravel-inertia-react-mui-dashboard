import { SpaceDashboardRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type AppLogoProps = {
    showName?: boolean;
};

export function AppLogo({ showName = true }: AppLogoProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                minWidth: 0,
            }}
        >
            <Box
                aria-hidden
                sx={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.contrastText',
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
            >
                <SpaceDashboardRounded fontSize="small" />
            </Box>
            {showName && (
                <Typography
                    component="span"
                    variant="h6"
                    noWrap
                    sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}
                >
                    Nimbus
                </Typography>
            )}
        </Box>
    );
}
