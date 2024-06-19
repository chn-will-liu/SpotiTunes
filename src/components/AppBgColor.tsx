import React, { createContext, useState } from 'react';

export type AppBg = {
    color: string;
};

export const AppBgContext = createContext<{
    bg: AppBg;
    setBg: (bg: AppBg) => void;
}>({
    bg: { color: 'transparent' },
    setBg: () => {},
});

export const AppBg = ({ children, color }: React.PropsWithChildren<{ color: string }>) => {
    const [bg, setBg] = useState<AppBg>({ color });
    return <AppBgContext.Provider value={{ bg, setBg }}>{children}</AppBgContext.Provider>;
};
