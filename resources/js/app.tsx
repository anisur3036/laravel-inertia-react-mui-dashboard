import { createInertiaApp } from '@inertiajs/react';
import { ThemeModeProvider } from '@/contexts/theme-mode-context';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        if (name.startsWith('auth/')) {
            return AuthLayout;
        }

        return name === 'welcome' ? undefined : AppLayout;
    },
    withApp: (app) => <ThemeModeProvider>{app}</ThemeModeProvider>,
    progress: {
        color: '#4F46E5',
    },
});
