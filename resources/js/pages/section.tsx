import { Head } from '@inertiajs/react';
import { ConstructionRounded } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { dashboardHome, navigation } from '@/config/navigation';
import { useLayout } from '@/contexts/layout-context';
import { buildBreadcrumbs } from '@/lib/navigation';

/** Placeholder page for dashboard sections that have no content yet. */
export default function Section({ section }: { section: string }) {
    const { currentPath } = useLayout();
    const title =
        buildBreadcrumbs(navigation, currentPath, dashboardHome).at(-1)
            ?.title ?? section;

    return (
        <>
            <Head title={title} />
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                {title}
            </Typography>
            <Card>
                <CardContent sx={{ py: 8, textAlign: 'center' }}>
                    <Avatar
                        sx={(theme) => ({
                            mx: 'auto',
                            mb: 2,
                            width: 56,
                            height: 56,
                            color: 'primary.main',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                        })}
                    >
                        <ConstructionRounded />
                    </Avatar>
                    <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                        Nothing here yet
                    </Typography>
                    <Box sx={{ maxWidth: 420, mx: 'auto' }}>
                        <Typography color="text.secondary">
                            The {title} page is a placeholder. Build it out in{' '}
                            <code>resources/js/pages</code>.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
