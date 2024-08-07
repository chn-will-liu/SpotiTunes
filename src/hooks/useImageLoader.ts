import { useEffect, useState } from 'react';

const imageCache = new Map<string, boolean>();

export const useImageLoader = (url: string | undefined) => {
    const [loaded, setLoaded] = useState(url && imageCache.has(url));
    const [error, setError] = useState(false);

    useEffect(() => {
        if (url && !imageCache.has(url)) {
            const img = new Image();
            img.onload = () => {
                setLoaded(true);
                imageCache.set(url, true);
            };
            img.onerror = () => setError(true);
            img.src = url;

            return () => {
                img.onload = null;
                img.onerror = null;
            };
        }
    }, [url]);

    return { loaded, error };
};
