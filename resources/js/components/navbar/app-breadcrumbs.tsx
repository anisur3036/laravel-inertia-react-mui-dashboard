import { RouterLink } from '@/components/router-link';
import { HomeRounded, NavigateNextRounded } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { dashboardHome, navigation } from '@/config/navigation';
import { useLayout } from '@/contexts/layout-context';
import { buildBreadcrumbs } from '@/lib/navigation';

export function AppBreadcrumbs() {
    const { currentPath } = useLayout();
    const crumbs = buildBreadcrumbs(navigation, currentPath, dashboardHome);

    return (
        <Breadcrumbs
            aria-label="Breadcrumb"
            separator={<NavigateNextRounded fontSize="small" />}
            sx={{ minWidth: 0, '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' } }}
        >
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                const isHome = index === 0 && crumb.href === dashboardHome.href;
                const label = (
                    <>
                        {isHome && (
                            <HomeRounded
                                aria-hidden
                                sx={{
                                    fontSize: 18,
                                    mr: 0.5,
                                    verticalAlign: 'text-bottom',
                                }}
                            />
                        )}
                        {crumb.title}
                    </>
                );

                if (isLast) {
                    return (
                        <Typography
                            key={`${crumb.title}-${index}`}
                            aria-current="page"
                            variant="body2"
                            noWrap
                            sx={{ fontWeight: 600, color: 'text.primary' }}
                        >
                            {label}
                        </Typography>
                    );
                }

                return crumb.href ? (
                    <MuiLink
                        key={`${crumb.title}-${index}`}
                        component={RouterLink}
                        href={crumb.href}
                        underline="hover"
                        variant="body2"
                        color="text.secondary"
                        noWrap
                    >
                        {label}
                    </MuiLink>
                ) : (
                    <Typography
                        key={`${crumb.title}-${index}`}
                        variant="body2"
                        color="text.secondary"
                        noWrap
                    >
                        {label}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
}
