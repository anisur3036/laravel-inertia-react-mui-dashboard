import {
    AdminPanelSettingsRounded,
    ArchiveRounded,
    AssessmentRounded,
    CalendarMonthRounded,
    CategoryRounded,
    DashboardRounded,
    GroupRounded,
    InsightsRounded,
    Inventory2Rounded,
    LockRounded,
    MailRounded,
    PersonRounded,
    PublicRounded,
    ReceiptLongRounded,
    SettingsRounded,
    ShoppingCartRounded,
    StorefrontRounded,
    TuneRounded,
    TrafficRounded,
    TrendingUpRounded,
    ViewListRounded,
} from '@mui/icons-material';
import { dashboard } from '@/routes';
import { section } from '@/routes/dashboard';
import type { NavSection } from '@/types';

export const dashboardHome = { title: 'Dashboard', href: dashboard.url() };

/**
 * Sidebar navigation tree. Items may be nested to any depth; a parent
 * either links somewhere itself or only groups its children.
 */
export const navigation: NavSection[] = [
    {
        id: 'overview',
        title: 'Overview',
        items: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                icon: DashboardRounded,
                href: dashboard.url(),
            },
            {
                id: 'analytics',
                title: 'Analytics',
                icon: InsightsRounded,
                children: [
                    {
                        id: 'analytics-overview',
                        title: 'Overview',
                        icon: TrendingUpRounded,
                        href: section.url('analytics/overview'),
                    },
                    {
                        id: 'analytics-reports',
                        title: 'Reports',
                        icon: AssessmentRounded,
                        children: [
                            {
                                id: 'analytics-reports-sales',
                                title: 'Sales',
                                icon: ReceiptLongRounded,
                                href: section.url('analytics/reports/sales'),
                            },
                            {
                                id: 'analytics-reports-traffic',
                                title: 'Traffic',
                                icon: TrafficRounded,
                                href: section.url('analytics/reports/traffic'),
                            },
                            {
                                id: 'analytics-reports-archive',
                                title: 'Archive',
                                icon: ArchiveRounded,
                                children: [
                                    {
                                        id: 'analytics-reports-archive-regional',
                                        title: 'Regional',
                                        icon: PublicRounded,
                                        href: section.url(
                                            'analytics/reports/archive/regional',
                                        ),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'calendar',
                title: 'Calendar',
                icon: CalendarMonthRounded,
                href: section.url('calendar'),
            },
            {
                id: 'messages',
                title: 'Messages',
                icon: MailRounded,
                href: section.url('messages'),
                badge: 4,
            },
        ],
    },
    {
        id: 'management',
        title: 'Management',
        items: [
            {
                id: 'commerce',
                title: 'E-commerce',
                icon: StorefrontRounded,
                children: [
                    {
                        id: 'commerce-products',
                        title: 'Products',
                        icon: Inventory2Rounded,
                        children: [
                            {
                                id: 'commerce-products-list',
                                title: 'All products',
                                icon: ViewListRounded,
                                href: section.url('commerce/products'),
                            },
                            {
                                id: 'commerce-products-categories',
                                title: 'Categories',
                                icon: CategoryRounded,
                                href: section.url(
                                    'commerce/products/categories',
                                ),
                            },
                        ],
                    },
                    {
                        id: 'commerce-orders',
                        title: 'Orders',
                        icon: ShoppingCartRounded,
                        href: section.url('commerce/orders'),
                    },
                ],
            },
            {
                id: 'users',
                title: 'Users',
                icon: GroupRounded,
                children: [
                    {
                        id: 'users-list',
                        title: 'All users',
                        icon: PersonRounded,
                        href: section.url('users'),
                    },
                    {
                        id: 'users-roles',
                        title: 'Roles & permissions',
                        icon: AdminPanelSettingsRounded,
                        href: section.url('users/roles'),
                    },
                ],
            },
            {
                id: 'settings',
                title: 'Settings',
                icon: SettingsRounded,
                children: [
                    {
                        id: 'settings-account',
                        title: 'Account',
                        icon: PersonRounded,
                        href: section.url('settings/account'),
                    },
                    {
                        id: 'settings-preferences',
                        title: 'Preferences',
                        icon: TuneRounded,
                        href: section.url('settings/preferences'),
                    },
                    {
                        id: 'settings-security',
                        title: 'Security',
                        icon: LockRounded,
                        href: section.url('settings/security'),
                    },
                ],
            },
        ],
    },
];

export const userMenuLinks = {
    profile: section.url('profile'),
    accountSettings: section.url('settings/account'),
    preferences: section.url('settings/preferences'),
    settings: section.url('settings/account'),
};
