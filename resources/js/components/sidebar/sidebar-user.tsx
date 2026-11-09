import { RouterLink } from '@/components/router-link';
import { usePage } from '@inertiajs/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { userMenuLinks } from '@/config/navigation';
import { getInitials } from '@/lib/navigation';

export function SidebarUser({
    isCollapsed = false,
}: {
    isCollapsed?: boolean;
}) {
    const { user } = usePage().props.auth;

    const card = (
        <ButtonBase
            component={RouterLink}
            href={userMenuLinks.profile}
            aria-label={`View profile for ${user.name}`}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: 1.5,
                p: 1,
                borderRadius: 2,
                textAlign: 'left',
                '&:hover': { bgcolor: 'action.hover' },
            }}
        >
            <Avatar
                src={user.avatar}
                alt=""
                sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    fontSize: 14,
                }}
            >
                {getInitials(user.name)}
            </Avatar>
            {!isCollapsed && (
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                        {user.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        noWrap
                        component="p"
                        color="text.secondary"
                    >
                        {user.email}
                    </Typography>
                </Box>
            )}
        </ButtonBase>
    );

    return isCollapsed ? (
        <Tooltip title={user.name} placement="right">
            {card}
        </Tooltip>
    ) : (
        card
    );
}
