import { RouterLink } from '@/components/router-link';
import { ChevronRightRounded } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import type { KeyboardEvent } from 'react';
import { useLayout } from '@/contexts/layout-context';
import { hasActiveDescendant, isNavItemActive } from '@/lib/navigation';
import type { NavItem as NavItemType } from '@/types';

type NavItemProps = {
    item: NavItemType;
    depth?: number;
    /** Icon-only rendering for the collapsed desktop sidebar. */
    isCollapsed?: boolean;
    /** Keeps element ids unique when the tree renders in more than one drawer. */
    idPrefix: string;
};

export function NavItem({
    item,
    depth = 0,
    isCollapsed = false,
    idPrefix,
}: NavItemProps) {
    const {
        currentPath,
        isItemExpanded,
        toggleItem,
        setItemExpanded,
        setSidebarCollapsed,
    } = useLayout();

    const hasChildren = (item.children?.length ?? 0) > 0;
    const isActive = isNavItemActive(item, currentPath);
    const isInActiveTrail =
        hasChildren && hasActiveDescendant(item, currentPath);
    const isExpanded = hasChildren && isItemExpanded(item.id);
    const isHighlighted = isActive || isInActiveTrail;
    const submenuId = `${idPrefix}-submenu-${item.id}`;
    const Icon = item.icon;

    const buttonSx: SxProps<Theme> = (theme) => ({
        minHeight: 40,
        borderRadius: 2,
        px: 1.25,
        py: 0.5,
        mb: 0.25,
        gap: 1.25,
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        color: isHighlighted ? 'primary.main' : 'text.secondary',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.06),
            color: 'text.primary',
        },
        '&.Mui-selected': {
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            color: 'primary.main',
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
        },
        '&.Mui-focusVisible': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            outlineOffset: -2,
        },
    });

    const handleParentKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight' && !isExpanded) {
            event.preventDefault();
            setItemExpanded(item.id, true);
        }

        if (event.key === 'ArrowLeft' && isExpanded) {
            event.preventDefault();
            setItemExpanded(item.id, false);
        }
    };

    const handleParentClick = () => {
        if (isCollapsed) {
            setSidebarCollapsed(false);
            setItemExpanded(item.id, true);

            return;
        }

        toggleItem(item.id);
    };

    const content = (
        <>
            <ListItemIcon
                sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center' }}
            >
                <Icon fontSize={depth > 0 ? 'small' : 'medium'} />
            </ListItemIcon>
            {!isCollapsed && (
                <ListItemText
                    primary={item.title}
                    sx={{ my: 0 }}
                    slotProps={{
                        primary: {
                            noWrap: true,
                            sx: {
                                fontSize: 14,
                                fontWeight: isHighlighted ? 600 : 500,
                            },
                        },
                    }}
                />
            )}
            {!isCollapsed && item.badge !== undefined && (
                <Chip
                    label={item.badge}
                    size="small"
                    color="primary"
                    aria-label={`${item.badge} new`}
                    sx={{ height: 20, fontSize: 11, fontWeight: 700 }}
                />
            )}
            {!isCollapsed && hasChildren && (
                <ChevronRightRounded
                    aria-hidden
                    fontSize="small"
                    sx={(theme) => ({
                        transform: isExpanded
                            ? 'rotate(90deg)'
                            : 'rotate(0deg)',
                        transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.shorter,
                        }),
                    })}
                />
            )}
        </>
    );

    const button = hasChildren ? (
        <ListItemButton
            onClick={handleParentClick}
            onKeyDown={handleParentKeyDown}
            aria-expanded={isCollapsed ? undefined : isExpanded}
            aria-controls={isCollapsed ? undefined : submenuId}
            aria-label={
                isCollapsed
                    ? `${item.title}, expand sidebar to view submenu`
                    : undefined
            }
            sx={buttonSx}
        >
            {content}
        </ListItemButton>
    ) : (
        <ListItemButton
            component={RouterLink}
            href={item.href ?? '#'}
            prefetch
            selected={isActive}
            aria-current={isActive ? 'page' : undefined}
            aria-label={isCollapsed ? item.title : undefined}
            sx={buttonSx}
        >
            {content}
        </ListItemButton>
    );

    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            {isCollapsed ? (
                <Tooltip title={item.title} placement="right">
                    {button}
                </Tooltip>
            ) : (
                button
            )}

            {hasChildren && !isCollapsed && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List
                        id={submenuId}
                        aria-label={`${item.title} submenu`}
                        disablePadding
                        sx={{
                            ml: depth === 0 ? 2.5 : 2,
                            pl: 1,
                            borderLeft: 1,
                            borderColor: 'divider',
                        }}
                    >
                        {item.children?.map((child) => (
                            <NavItem
                                key={child.id}
                                item={child}
                                depth={depth + 1}
                                idPrefix={idPrefix}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </ListItem>
    );
}
