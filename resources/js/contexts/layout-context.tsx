import { usePage } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { navigation } from '@/config/navigation';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { findActiveTrailInSections, normalizePath } from '@/lib/navigation';

type LayoutContextValue = {
    currentPath: string;
    isSidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleSidebarCollapsed: () => void;
    isMobileDrawerOpen: boolean;
    openMobileDrawer: () => void;
    closeMobileDrawer: () => void;
    isItemExpanded: (id: string) => boolean;
    toggleItem: (id: string) => void;
    setItemExpanded: (id: string, expanded: boolean) => void;
};

const SIDEBAR_STATES = ['expanded', 'collapsed'] as const;

const LayoutContext = createContext<LayoutContextValue | null>(null);

function activeParentIds(currentPath: string): string[] {
    return findActiveTrailInSections(navigation, currentPath)
        .slice(0, -1)
        .map((item) => item.id);
}

export function LayoutProvider({ children }: { children: ReactNode }) {
    const currentPath = normalizePath(usePage().url);

    const [sidebarState, setSidebarState] = usePersistentState(
        'sidebar-state',
        'expanded',
        SIDEBAR_STATES,
    );
    const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(
        () => new Set(activeParentIds(currentPath)),
    );
    const [previousPath, setPreviousPath] = useState(currentPath);

    // On navigation: auto-expand the new active parents and close the
    // mobile drawer. Adjusting state during render avoids an extra effect pass.
    if (previousPath !== currentPath) {
        setPreviousPath(currentPath);
        setMobileDrawerOpen(false);
        setExpandedIds(
            (ids) => new Set([...ids, ...activeParentIds(currentPath)]),
        );
    }

    const setItemExpanded = (id: string, expanded: boolean) => {
        setExpandedIds((ids) => {
            const next = new Set(ids);

            if (expanded) {
                next.add(id);
            } else {
                next.delete(id);
            }

            return next;
        });
    };

    const isSidebarCollapsed = sidebarState === 'collapsed';

    const value: LayoutContextValue = {
        currentPath,
        isSidebarCollapsed,
        setSidebarCollapsed: (collapsed) =>
            setSidebarState(collapsed ? 'collapsed' : 'expanded'),
        toggleSidebarCollapsed: () =>
            setSidebarState(isSidebarCollapsed ? 'expanded' : 'collapsed'),
        isMobileDrawerOpen,
        openMobileDrawer: () => setMobileDrawerOpen(true),
        closeMobileDrawer: () => setMobileDrawerOpen(false),
        isItemExpanded: (id) => expandedIds.has(id),
        toggleItem: (id) => setItemExpanded(id, !expandedIds.has(id)),
        setItemExpanded,
    };

    return <LayoutContext value={value}>{children}</LayoutContext>;
}

export function useLayout(): LayoutContextValue {
    const context = useContext(LayoutContext);

    if (context === null) {
        throw new Error('useLayout must be used within LayoutProvider.');
    }

    return context;
}
