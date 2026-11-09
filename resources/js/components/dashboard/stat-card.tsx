import { TrendingDownRounded, TrendingUpRounded } from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export type StatCardProps = {
    label: string;
    value: string;
    /** Percentage change versus the previous period. */
    change: number;
    icon: SvgIconComponent;
};

export function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
    const isPositive = change >= 0;
    const TrendIcon = isPositive ? TrendingUpRounded : TrendingDownRounded;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        {label}
                    </Typography>
                    <Avatar
                        variant="rounded"
                        sx={(theme) => ({
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            color: 'primary.main',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                        })}
                    >
                        <Icon fontSize="small" />
                    </Avatar>
                </Box>
                <Typography
                    variant="h5"
                    component="p"
                    sx={{ mb: 0.75, fontVariantNumeric: 'tabular-nums' }}
                >
                    {value}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: isPositive ? 'success.main' : 'error.main',
                        fontWeight: 600,
                    }}
                >
                    <TrendIcon sx={{ fontSize: 16 }} aria-hidden />
                    {isPositive ? '+' : '−'}
                    {Math.abs(change).toFixed(1)}%
                    <Box
                        component="span"
                        sx={{ color: 'text.secondary', fontWeight: 400 }}
                    >
                        vs last month
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    );
}
