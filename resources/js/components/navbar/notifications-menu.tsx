import {
    NotificationsNoneRounded,
    PersonAddRounded,
    ShoppingBagRounded,
    WarningAmberRounded,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { MouseEvent } from 'react';

type Notification = {
    id: number;
    title: string;
    time: string;
    icon: SvgIconComponent;
    color: 'primary' | 'success' | 'warning';
    isRead: boolean;
};

const initialNotifications: Notification[] = [
    {
        id: 1,
        title: 'New order #1042 received',
        time: '2 min ago',
        icon: ShoppingBagRounded,
        color: 'success',
        isRead: false,
    },
    {
        id: 2,
        title: 'Ava Thompson joined your team',
        time: '1 hour ago',
        icon: PersonAddRounded,
        color: 'primary',
        isRead: false,
    },
    {
        id: 3,
        title: 'Storage is 85% full',
        time: 'Yesterday',
        icon: WarningAmberRounded,
        color: 'warning',
        isRead: false,
    },
];

export function NotificationsMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter(
        (notification) => !notification.isRead,
    ).length;
    const isOpen = anchorEl !== null;
    const label =
        unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : 'Notifications';

    const markAsRead = (id?: number) =>
        setNotifications((items) =>
            items.map((item) =>
                id === undefined || item.id === id
                    ? { ...item, isRead: true }
                    : item,
            ),
        );

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    aria-label={label}
                    aria-haspopup="true"
                    aria-controls={isOpen ? 'notifications-menu' : undefined}
                    aria-expanded={isOpen}
                    onClick={(event: MouseEvent<HTMLElement>) =>
                        setAnchorEl(event.currentTarget)
                    }
                >
                    <Badge badgeContent={unreadCount} color="error" max={9}>
                        <NotificationsNoneRounded />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                id="notifications-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 340,
                            maxWidth: 'calc(100vw - 32px)',
                            mt: 1,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="subtitle1" component="h2">
                        Notifications
                    </Typography>
                    <Button
                        size="small"
                        onClick={() => markAsRead()}
                        disabled={unreadCount === 0}
                    >
                        Mark all as read
                    </Button>
                </Box>
                <Divider />
                {notifications.map((notification) => {
                    const Icon = notification.icon;

                    return (
                        <MenuItem
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            sx={{
                                gap: 1.5,
                                py: 1.25,
                                whiteSpace: 'normal',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 34,
                                    height: 34,
                                    bgcolor: `${notification.color}.main`,
                                }}
                            >
                                <Icon fontSize="small" />
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: notification.isRead
                                            ? 400
                                            : 600,
                                    }}
                                >
                                    {notification.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {notification.time}
                                    {!notification.isRead && ' · Unread'}
                                </Typography>
                            </Box>
                            {!notification.isRead && (
                                <Box
                                    aria-hidden
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        mt: 0.75,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                    }}
                                />
                            )}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
