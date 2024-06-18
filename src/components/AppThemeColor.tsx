import React, { createContext, useState } from 'react';

export const ThemeColorContext = createContext<{
    color: string;
    setColor: (color: string) => void;
}>({
    color: 'transparent',
    setColor: () => {},
});

export const ThemeColor = ({ children, color }: React.PropsWithChildren<{ color: string }>) => {
    const [currentColor, setColor] = useState(color);
    return (
        <ThemeColorContext.Provider value={{ color: currentColor, setColor }}>
            {children}
        </ThemeColorContext.Provider>
    );
};
