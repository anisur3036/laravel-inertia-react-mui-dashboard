import { alpha, createTheme } from '@mui/material/styles';
import type { PaletteMode, Theme } from '@mui/material/styles';

const fontFamily = [
    '"Instrument Sans"',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
].join(',');

export const colorTransition =
    'background-color 250ms ease, border-color 250ms ease, color 250ms ease, box-shadow 250ms ease';

export function createAppTheme(mode: PaletteMode): Theme {
    const isDark = mode === 'dark';
    const primaryMain = isDark ? '#818cf8' : '#4f46e5';

    return createTheme({
        palette: {
            mode,
            primary: { main: primaryMain },
            secondary: { main: isDark ? '#38bdf8' : '#0284c7' },
            success: { main: isDark ? '#4ade80' : '#16a34a' },
            error: { main: isDark ? '#f87171' : '#dc2626' },
            background: {
                default: isDark ? '#0b0f1a' : '#f5f6fa',
                paper: isDark ? '#111827' : '#ffffff',
            },
            divider: isDark
                ? 'rgba(148, 163, 184, 0.14)'
                : 'rgba(15, 23, 42, 0.08)',
            text: {
                primary: isDark ? '#e5e7eb' : '#0f172a',
                secondary: isDark ? '#94a3b8' : '#64748b',
            },
        },
        shape: { borderRadius: 10 },
        typography: {
            fontFamily,
            h4: { fontWeight: 700, letterSpacing: '-0.02em' },
            h5: { fontWeight: 700, letterSpacing: '-0.01em' },
            h6: { fontWeight: 600 },
            subtitle1: { fontWeight: 600 },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme: Theme) => ({
                    html: { colorScheme: mode },
                    body: { transition: colorTransition },
                    'a:focus-visible': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: 2,
                        borderRadius: 4,
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                        '*, *::before, *::after': {
                            transitionDuration: '0.01ms !important',
                            animationDuration: '0.01ms !important',
                        },
                    },
                }),
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '&.Mui-focusVisible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: 2,
                        },
                    }),
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        transition: colorTransition,
                    },
                },
            },
            MuiCard: {
                defaultProps: { variant: 'outlined' },
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: 14,
                        boxShadow: isDark
                            ? 'none'
                            : `0 1px 2px ${alpha(theme.palette.common.black, 0.04)}`,
                    }),
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
            },
            MuiTooltip: {
                defaultProps: { arrow: true },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: ({ theme }) => ({
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: `0 12px 32px ${alpha(theme.palette.common.black, isDark ? 0.5 : 0.12)}`,
                    }),
                },
            },
        },
    });
}
