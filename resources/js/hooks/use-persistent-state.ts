import { useCallback, useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener('storage', listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', listener);
    };
}

function readStorage(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

/**
 * SSR-safe string state persisted to localStorage and synced across tabs.
 * The server (and hydration) render always uses the default value.
 */
export function usePersistentState<T extends string>(
    key: string,
    defaultValue: T,
    allowedValues: readonly T[],
): [T, (value: T) => void] {
    const storedValue = useSyncExternalStore(
        subscribe,
        () => readStorage(key),
        () => null,
    );

    const value = allowedValues.includes(storedValue as T)
        ? (storedValue as T)
        : defaultValue;

    const setValue = useCallback(
        (nextValue: T) => {
            try {
                window.localStorage.setItem(key, nextValue);
            } catch {
                // Storage may be unavailable (private mode); state stays default.
            }

            listeners.forEach((listener) => listener());
        },
        [key],
    );

    return [value, setValue];
}
