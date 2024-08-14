import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends any[]>(fn: (...args: T) => any, delay: number) => {
    const timerRef = useRef<number | null>(null);
    const fnRef = useRef(fn);
    fnRef.current = fn;

    return useCallback(
        (...args: T) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => fnRef.current(...args), delay);
        },
        [fnRef, delay]
    );
};
