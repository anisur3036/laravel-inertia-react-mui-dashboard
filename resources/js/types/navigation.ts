import type { SvgIconComponent } from '@mui/icons-material';

export type NavItem = {
    /** Stable unique identifier, used to track expanded state. */
    id: string;
    title: string;
    icon: SvgIconComponent;
    href?: string;
    badge?: string | number;
    children?: NavItem[];
};

export type NavSection = {
    id: string;
    title: string;
    items: NavItem[];
};

export type BreadcrumbItem = {
    title: string;
    href?: string;
};
