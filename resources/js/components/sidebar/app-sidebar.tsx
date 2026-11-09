import { CloseRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import type { Theme } from '@mui/material/styles';
import { AppLogo } from '@/components/app-logo';
import { NavItem } from '@/components/sidebar/nav-item';
import { SidebarUser } from '@/components/sidebar/sidebar-user';
import { navigation } from '@/config/navigation';
import { useLayout } from '@/contexts/layout-context';

export const SIDEBAR_WIDTH = 272;
export const SIDEBAR_COLLAPSED_WIDTH = 76;
export const NAVBAR_HEIGHT = 64;

const widthTransition = (theme: Theme, isCollapsed: boolean) =>
    theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: isCollapsed
            ? theme.transitions.duration.leavingScreen
            : theme.transitions.duration.enteringScreen,
    });

type SidebarContentProps = {
    isCollapsed: boolean;
    idPrefix: string;
    onClose?: () => void;
};

function SidebarContent({
    isCollapsed,
    idPrefix,
    onClose,
}: SidebarContentProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
                sx={{
                    height: NAVBAR_HEIGHT,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    px: isCollapsed ? 0 : 2.5,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <AppLogo showName={!isCollapsed} />
                {onClose && (
                    <IconButton
                        onClick={onClose}
                        aria-label="Close navigation menu"
                        edge="end"
                    >
                        <CloseRounded />
                    </IconButton>
                )}
            </Box>

            <Box
                component="nav"
                aria-label="Main navigation"
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    px: 1.5,
                    py: 1.5,
                }}
            >
                {navigation.map((section, index) => (
                    <List
                        key={section.id}
                        disablePadding
                        aria-labelledby={
                            isCollapsed
                                ? undefined
                                : `${idPrefix}-section-${section.id}`
                        }
                        aria-label={isCollapsed ? section.title : undefined}
                        subheader={
                            isCollapsed ? undefined : (
                                <ListSubheader
                                    id={`${idPrefix}-section-${section.id}`}
                                    disableSticky
                                    sx={{
                                        bgcolor: 'transparent',
                                        lineHeight: 2.5,
                                        px: 1.25,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {section.title}
                                </ListSubheader>
                            )
                        }
                    >
                        {isCollapsed && index > 0 && <Divider sx={{ my: 1 }} />}
                        {section.items.map((item) => (
                            <NavItem
                                key={item.id}
                                item={item}
                                isCollapsed={isCollapsed}
                                idPrefix={idPrefix}
                            />
                        ))}
                    </List>
                ))}
            </Box>

            <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
                <SidebarUser isCollapsed={isCollapsed} />
            </Box>
        </Box>
    );
}

export function AppSidebar() {
    const { isSidebarCollapsed, isMobileDrawerOpen, closeMobileDrawer } =
        useLayout();
    const desktopWidth = isSidebarCollapsed
        ? SIDEBAR_COLLAPSED_WIDTH
        : SIDEBAR_WIDTH;

    return (
        <>
            {/* Mobile: slide-over drawer, closes on backdrop click or Escape. */}
            <Drawer
                variant="temporary"
                open={isMobileDrawerOpen}
                onClose={closeMobileDrawer}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: SIDEBAR_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <SidebarContent
                    isCollapsed={false}
                    idPrefix="mobile-nav"
                    onClose={closeMobileDrawer}
                />
            </Drawer>

            {/* Desktop: fixed, collapsible sidebar. */}
            <Drawer
                variant="permanent"
                open
                sx={(theme) => ({
                    display: { xs: 'none', md: 'block' },
                    width: desktopWidth,
                    flexShrink: 0,
                    transition: widthTransition(theme, isSidebarCollapsed),
                    '& .MuiDrawer-paper': {
                        width: desktopWidth,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        borderColor: 'divider',
                        transition: `${widthTransition(theme, isSidebarCollapsed)}, background-color 250ms ease`,
                    },
                })}
            >
                <SidebarContent
                    isCollapsed={isSidebarCollapsed}
                    idPrefix="desktop-nav"
                />
            </Drawer>
        </>
    );
}
