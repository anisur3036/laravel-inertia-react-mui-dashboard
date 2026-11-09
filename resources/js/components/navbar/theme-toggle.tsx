import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useThemeMode } from '@/contexts/theme-mode-context';

export function ThemeToggle() {
    const { resolvedMode, toggleMode } = useThemeMode();
    const label =
        resolvedMode === 'dark'
            ? 'Switch to light mode'
            : 'Switch to dark mode';

    return (
        <Tooltip title={label}>
            <IconButton onClick={toggleMode} aria-label={label}>
                {resolvedMode === 'dark' ? (
                    <LightModeRounded />
                ) : (
                    <DarkModeRounded />
                )}
            </IconButton>
        </Tooltip>
    );
}
