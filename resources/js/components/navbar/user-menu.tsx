import { RouterLink } from '@/components/router-link';
import { router, usePage } from '@inertiajs/react';
import {
    LogoutRounded,
    ManageAccountsRounded,
    PersonRounded,
    TuneRounded,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { userMenuLinks } from '@/config/navigation';
import { getInitials } from '@/lib/navigation';
import { logout } from '@/routes';

const menuLinks = [
    { label: 'Profile', href: userMenuLinks.profile, icon: PersonRounded },
    {
        label: 'Account Settings',
        href: userMenuLinks.accountSettings,
        icon: ManageAccountsRounded,
    },
    {
        label: 'Preferences',
        href: userMenuLinks.preferences,
        icon: TuneRounded,
    },
];

export function UserMenu() {
    const { user } = usePage().props.auth;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = anchorEl !== null;
    const closeMenu = () => setAnchorEl(null);

    const handleLogout = () => {
        closeMenu();
        router.flushAll();
        router.post(logout.url());
    };

    return (
        <>
            <Tooltip title="Account">
                <IconButton
                    onClick={(event: MouseEvent<HTMLElement>) =>
                        setAnchorEl(event.currentTarget)
                    }
                    aria-label={`Account menu for ${user.name}`}
                    aria-haspopup="true"
                    aria-controls={isOpen ? 'user-menu' : undefined}
                    aria-expanded={isOpen}
                    sx={{ p: 0.5 }}
                >
                    <Avatar
                        src={user.avatar}
                        alt=""
                        sx={{
                            width: 34,
                            height: 34,
                            bgcolor: 'primary.main',
                            fontSize: 14,
                        }}
                    >
                        {getInitials(user.name)}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={closeMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { width: 240, mt: 1 } } }}
            >
                <Box sx={{ px: 2, py: 1.25 }}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                        {user.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        component="p"
                    >
                        {user.email}
                    </Typography>
                </Box>
                <Divider />
                {menuLinks.map(({ label, href, icon: Icon }) => (
                    <MenuItem
                        key={label}
                        component={RouterLink}
                        href={href}
                        onClick={closeMenu}
                    >
                        <ListItemIcon>
                            <Icon fontSize="small" />
                        </ListItemIcon>
                        {label}
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <LogoutRounded fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
