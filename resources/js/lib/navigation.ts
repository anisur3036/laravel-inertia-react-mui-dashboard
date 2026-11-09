import type { BreadcrumbItem, NavItem, NavSection } from '@/types';

/** Strip query string, hash and trailing slash from a URL. */
export function normalizePath(url: string): string {
    const path = url.split(/[?#]/)[0] ?? '/';

    return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function isNavItemActive(item: NavItem, currentPath: string): boolean {
    return item.href !== undefined && normalizePath(item.href) === currentPath;
}

/** Returns the chain of items from the root down to the active item. */
export function findActiveTrail(
    items: NavItem[],
    currentPath: string,
): NavItem[] {
    for (const item of items) {
        if (isNavItemActive(item, currentPath)) {
            return [item];
        }

        if (item.children?.length) {
            const childTrail = findActiveTrail(item.children, currentPath);

            if (childTrail.length > 0) {
                return [item, ...childTrail];
            }
        }
    }

    return [];
}

export function findActiveTrailInSections(
    sections: NavSection[],
    currentPath: string,
): NavItem[] {
    return findActiveTrail(
        sections.flatMap((section) => section.items),
        currentPath,
    );
}

export function hasActiveDescendant(
    item: NavItem,
    currentPath: string,
): boolean {
    return (item.children ?? []).some(
        (child) =>
            isNavItemActive(child, currentPath) ||
            hasActiveDescendant(child, currentPath),
    );
}

export type SearchableNavItem = {
    id: string;
    title: string;
    href: string;
    path: string;
    icon: NavItem['icon'];
};

/** Flattens every linkable nav item, keeping its ancestry for display. */
export function flattenNavItems(
    items: NavItem[],
    ancestors: string[] = [],
): SearchableNavItem[] {
    return items.flatMap((item) => {
        const own: SearchableNavItem[] = item.href
            ? [
                  {
                      id: item.id,
                      title: item.title,
                      href: item.href,
                      path: ancestors.join(' / '),
                      icon: item.icon,
                  },
              ]
            : [];

        return [
            ...own,
            ...flattenNavItems(item.children ?? [], [...ancestors, item.title]),
        ];
    });
}

function titleCase(segment: string): string {
    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function buildBreadcrumbs(
    sections: NavSection[],
    currentPath: string,
    home: BreadcrumbItem & { href: string },
): BreadcrumbItem[] {
    const trail = findActiveTrailInSections(sections, currentPath);

    if (trail.length > 0) {
        const crumbs = trail.map(({ title, href }) => ({ title, href }));

        return trail[0]?.href === home.href ? crumbs : [home, ...crumbs];
    }

    const segments = currentPath
        .replace(normalizePath(home.href), '')
        .split('/')
        .filter(Boolean);

    return [
        home,
        ...segments.map((segment) => ({ title: titleCase(segment) })),
    ];
}

export function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}
