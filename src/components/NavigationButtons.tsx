import { useCallback, useEffect, useState } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IconButton } from './IconButton';

interface Navigation extends EventTarget {
    canGoBack: boolean;
    canGoForward: boolean;
}

declare global {
    interface Window {
        navigation?: Navigation;
    }
}

export const NavigationButtons = () => {
    const navigate = useNavigate();
    const { canGoBack, canGoForward } = useNavigationAvailability();
    const handleGoBack = useCallback(() => navigate(-1), [navigate]);
    const handleGoForward = useCallback(() => navigate(1), [navigate]);

    return (
        <>
            <IconButton
                icon={MdOutlineChevronLeft}
                buttonStyle="rounded"
                size="lg"
                className="ml-4"
                onClick={handleGoBack}
                disabled={!canGoBack}
            />

            <IconButton
                icon={MdOutlineChevronRight}
                buttonStyle="rounded"
                size="lg"
                className="ml-2"
                onClick={handleGoForward}
                disabled={!canGoForward}
            />
        </>
    );
};

const useNavigationAvailability = () => {
    const [canGoBack, setCanGoBack] = useState(true);
    const [canGoForward, setCanGoForward] = useState(false);

    useEffect(() => {
        if (window.navigation) {
            const onCurrentEntryChange = (ev: Event) => {
                const nav = ev.target as Navigation;
                setCanGoBack(nav.canGoBack);
                setCanGoForward(nav.canGoForward);
            };
            window.navigation.addEventListener('currententrychange', onCurrentEntryChange);

            return () =>
                window.navigation?.removeEventListener('currententrychange', onCurrentEntryChange);
        }
    }, []);

    return { canGoBack, canGoForward };
};
