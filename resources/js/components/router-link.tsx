import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';

export type RouterLinkProps = Omit<
    InertiaLinkProps,
    'href' | 'as' | 'component'
> & {
    href: string;
};

/**
 * Inertia `<Link>` adapter for MUI's `component` prop, e.g.
 * `<ListItemButton component={RouterLink} href="/dashboard" />`.
 *
 * Inertia's own `component` prop (instant visits) is omitted because it
 * collides with MUI's polymorphic `component` prop.
 */
export function RouterLink(props: RouterLinkProps) {
    return <Link {...props} />;
}
