import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { AppNavbar } from '@/components/navbar/app-navbar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SkipToContentLink } from '@/components/skip-to-content-link';
import { LayoutProvider } from '@/contexts/layout-context';

export const MAIN_CONTENT_ID = 'main-content';

/**
 * Authenticated shell: fixed sidebar, sticky blurred navbar and an
 * independently scrolling content region. Persistent across visits.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutProvider>
            <SkipToContentLink targetId={MAIN_CONTENT_ID} />
            <Box
                sx={{
                    display: 'flex',
                    height: '100dvh',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                }}
            >
                <AppSidebar />
                <Box
                    scroll-region=""
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                    }}
                >
                    <AppNavbar />
                    <Box
                        component="main"
                        id={MAIN_CONTENT_ID}
                        tabIndex={-1}
                        sx={{
                            flex: 1,
                            p: { xs: 2, sm: 3, lg: 4 },
                            outline: 'none',
                        }}
                    >
                        <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutProvider>
    );
}
