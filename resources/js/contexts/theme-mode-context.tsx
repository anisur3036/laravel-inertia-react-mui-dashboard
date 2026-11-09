import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { createAppTheme } from '@/theme/create-app-theme';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedThemeMode = 'light' | 'dark';

type ThemeModeContextValue = {
    mode: ThemeMode;
    resolvedMode: ResolvedThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
};

const THEME_MODES = ['light', 'dark', 'system'] as const;

export const THEME_STORAGE_KEY = 'theme-mode';

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = usePersistentState<ThemeMode>(
        THEME_STORAGE_KEY,
        'system',
        THEME_MODES,
    );
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const resolvedMode: ResolvedThemeMode =
        mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;

    const theme = useMemo(() => createAppTheme(resolvedMode), [resolvedMode]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', resolvedMode === 'dark');
        root.style.colorScheme = resolvedMode;
    }, [resolvedMode]);

    const value: ThemeModeContextValue = {
        mode,
        resolvedMode,
        setMode,
        toggleMode: () => setMode(resolvedMode === 'dark' ? 'light' : 'dark'),
    };

    return (
        <ThemeModeContext value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </ThemeModeContext>
    );
}

export function useThemeMode(): ThemeModeContextValue {
    const context = useContext(ThemeModeContext);

    if (context === null) {
        throw new Error('useThemeMode must be used within ThemeModeProvider.');
    }

    return context;
}
