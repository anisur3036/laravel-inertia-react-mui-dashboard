import { Head, usePage } from '@inertiajs/react';
import {
    AttachMoneyRounded,
    PercentRounded,
    PeopleAltRounded,
    ShoppingCartRounded,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { StatCard } from '@/components/dashboard/stat-card';
import type { StatCardProps } from '@/components/dashboard/stat-card';
import { getInitials } from '@/lib/navigation';

const stats: StatCardProps[] = [
    {
        label: 'Total revenue',
        value: '$48,295',
        change: 12.4,
        icon: AttachMoneyRounded,
    },
    {
        label: 'New customers',
        value: '1,284',
        change: 8.1,
        icon: PeopleAltRounded,
    },
    {
        label: 'Orders',
        value: '3,672',
        change: -2.3,
        icon: ShoppingCartRounded,
    },
    {
        label: 'Conversion rate',
        value: '3.42%',
        change: 0.6,
        icon: PercentRounded,
    },
];

type OrderStatus = 'Paid' | 'Pending' | 'Refunded';

const recentOrders: {
    id: string;
    customer: string;
    date: string;
    amount: string;
    status: OrderStatus;
}[] = [
    {
        id: '#1042',
        customer: 'Ava Thompson',
        date: 'Nov 9, 2026',
        amount: '$249.00',
        status: 'Paid',
    },
    {
        id: '#1041',
        customer: 'Liam Carter',
        date: 'Nov 9, 2026',
        amount: '$89.50',
        status: 'Pending',
    },
    {
        id: '#1040',
        customer: 'Sofia Martinez',
        date: 'Nov 8, 2026',
        amount: '$1,120.00',
        status: 'Paid',
    },
    {
        id: '#1039',
        customer: 'Noah Kim',
        date: 'Nov 8, 2026',
        amount: '$54.99',
        status: 'Refunded',
    },
    {
        id: '#1038',
        customer: 'Mia Patel',
        date: 'Nov 7, 2026',
        amount: '$310.25',
        status: 'Paid',
    },
];

const statusColor: Record<OrderStatus, 'success' | 'warning' | 'default'> = {
    Paid: 'success',
    Pending: 'warning',
    Refunded: 'default',
};

const goals = [
    {
        label: 'Monthly revenue',
        current: '$48.3k',
        target: '$60k',
        progress: 80,
    },
    { label: 'New customers', current: '1,284', target: '1,500', progress: 86 },
    {
        label: 'Support tickets resolved',
        current: '412',
        target: '600',
        progress: 69,
    },
];

export default function Dashboard() {
    const { user } = usePage().props.auth;
    const firstName = user.name.split(' ')[0];

    return (
        <>
            <Head title="Dashboard" />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
                    Welcome back, {firstName}
                </Typography>
                <Typography color="text.secondary">
                    Here&apos;s what&apos;s happening with your store today.
                    (Sample data)
                </Typography>
            </Box>

            <Box component="section" aria-label="Key metrics" sx={{ mb: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {stats.map((stat) => (
                        <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
                            <StatCard {...stat} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card
                        component="section"
                        aria-labelledby="recent-orders-title"
                        sx={{ height: '100%' }}
                    >
                        <CardHeader
                            title="Recent orders"
                            subheader="Latest 5 transactions"
                            slotProps={{
                                title: {
                                    id: 'recent-orders-title',
                                    variant: 'subtitle1',
                                    component: 'h2',
                                },
                            }}
                        />
                        <TableContainer>
                            <Table
                                size="medium"
                                aria-labelledby="recent-orders-title"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell
                                            sx={{
                                                display: {
                                                    xs: 'none',
                                                    sm: 'table-cell',
                                                },
                                            }}
                                        >
                                            Date
                                        </TableCell>
                                        <TableCell align="right">
                                            Amount
                                        </TableCell>
                                        <TableCell align="right">
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow
                                            key={order.id}
                                            hover
                                            sx={{
                                                '&:last-child td': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                {order.id}
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.25,
                                                    }}
                                                >
                                                    <Avatar
                                                        aria-hidden
                                                        sx={{
                                                            width: 28,
                                                            height: 28,
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        {getInitials(
                                                            order.customer,
                                                        )}
                                                    </Avatar>
                                                    <Typography
                                                        variant="body2"
                                                        noWrap
                                                    >
                                                        {order.customer}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    display: {
                                                        xs: 'none',
                                                        sm: 'table-cell',
                                                    },
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {order.date}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontVariantNumeric:
                                                        'tabular-nums',
                                                }}
                                            >
                                                {order.amount}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={order.status}
                                                    size="small"
                                                    color={
                                                        statusColor[
                                                            order.status
                                                        ]
                                                    }
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card
                        component="section"
                        aria-labelledby="goals-title"
                        sx={{ height: '100%' }}
                    >
                        <CardHeader
                            title="Monthly goals"
                            subheader="November progress"
                            slotProps={{
                                title: {
                                    id: 'goals-title',
                                    variant: 'subtitle1',
                                    component: 'h2',
                                },
                            }}
                        />
                        <CardContent>
                            <Stack spacing={3}>
                                {goals.map((goal) => (
                                    <Box key={goal.label}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 500 }}
                                            >
                                                {goal.label}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {goal.current} / {goal.target}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={goal.progress}
                                            aria-label={`${goal.label}: ${goal.progress}% of target`}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
