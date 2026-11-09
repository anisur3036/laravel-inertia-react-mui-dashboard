import { RouterLink } from '@/components/router-link';
import {
    MenuOpenRounded,
    MenuRounded,
    SettingsOutlined,
} from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { AppBreadcrumbs } from '@/components/navbar/app-breadcrumbs';
import { GlobalSearch } from '@/components/navbar/global-search';
import { NotificationsMenu } from '@/components/navbar/notifications-menu';
import { ThemeToggle } from '@/components/navbar/theme-toggle';
import { UserMenu } from '@/components/navbar/user-menu';
import { NAVBAR_HEIGHT } from '@/components/sidebar/app-sidebar';
import { userMenuLinks } from '@/config/navigation';
import { useLayout } from '@/contexts/layout-context';
import { colorTransition } from '@/theme/create-app-theme';

export function AppNavbar() {
    const {
        isSidebarCollapsed,
        toggleSidebarCollapsed,
        isMobileDrawerOpen,
        openMobileDrawer,
    } = useLayout();
    const collapseLabel = isSidebarCollapsed
        ? 'Expand sidebar'
        : 'Collapse sidebar';

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={(theme) => ({
                top: 0,
                zIndex: theme.zIndex.appBar,
                bgcolor: alpha(theme.palette.background.default, 0.75),
                backdropFilter: 'saturate(180%) blur(12px)',
                borderBottom: 1,
                borderColor: 'divider',
                boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.3 : 0.05)}`,
                transition: colorTransition,
            })}
        >
            <Toolbar
                sx={{
                    minHeight: `${NAVBAR_HEIGHT}px !important`,
                    gap: { xs: 1, md: 2 },
                    px: { xs: 1.5, md: 3 },
                }}
            >
                <Box
                    sx={{
                        flex: { xs: '0 0 auto', md: 1 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: 0,
                    }}
                >
                    <IconButton
                        onClick={openMobileDrawer}
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileDrawerOpen}
                        edge="start"
                        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                    >
                        <MenuRounded />
                    </IconButton>
                    <Tooltip title={collapseLabel}>
                        <IconButton
                            onClick={toggleSidebarCollapsed}
                            aria-label={collapseLabel}
                            aria-expanded={!isSidebarCollapsed}
                            edge="start"
                            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                        >
                            {isSidebarCollapsed ? (
                                <MenuRounded />
                            ) : (
                                <MenuOpenRounded />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            minWidth: 0,
                        }}
                    >
                        <AppBreadcrumbs />
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: { xs: 1, md: '0 1 440px' },
                        display: 'flex',
                        justifyContent: 'center',
                        minWidth: 0,
                    }}
                >
                    <GlobalSearch />
                </Box>

                <Box
                    sx={{
                        flex: { xs: '0 0 auto', md: 1 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: { xs: 0, sm: 0.5 },
                    }}
                >
                    <ThemeToggle />
                    <NotificationsMenu />
                    <Tooltip title="Settings">
                        <IconButton
                            component={RouterLink}
                            href={userMenuLinks.settings}
                            aria-label="Settings"
                            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                        >
                            <SettingsOutlined />
                        </IconButton>
                    </Tooltip>
                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
