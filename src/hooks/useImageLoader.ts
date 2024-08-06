import { useEffect, useState } from 'react';

export const useImageLoader = (url: string | undefined) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = () => setLoaded(true);
            img.onerror = () => setError(true);

            return () => {
                img.onload = null;
                img.onerror = null;
            };
        }
    }, [url]);

    return { loaded, error };
};
