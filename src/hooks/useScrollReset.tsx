import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReset = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    useLayoutEffect(() => {
        scrollContainerRef.current &&
            scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    return scrollContainerRef;
};
