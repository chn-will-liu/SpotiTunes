import { useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottleCallback = <T extends any[]>(
    value: (...args: T) => void,
    delay: number
): ((...args: T) => void) => {
    const callback = useRef(value);
    callback.current = value;

    return useMemo(() => {
        let lastUpdated: number | null;

        return (...args: T) => {
            const now = Date.now();
            if (lastUpdated && now >= lastUpdated + delay) {
                lastUpdated = now;
                callback.current(...args);
            } else {
                window.setTimeout(() => {
                    lastUpdated = now;
                    callback.current(...args);
                }, delay);
            }
        };
    }, [delay]);
};
