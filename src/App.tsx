import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Player } from './components/player/Player';
import { AppBgContext } from './components/shell/AppBgColor';
import { AppSideBar } from './components/shell/AppSideBar';
import { SideMenuBar } from './components/shell/SideMenuBar';
import { useScrollReset } from './hooks/useScrollReset';

const App = () => {
    const scrollContainerRef = useScrollReset();

    return (
        <AppBg>
            <SideMenuBar />
            <div className="flex min-w-[600px] flex-1 flex-col">
                <div
                    className="relative flex-1 overflow-auto pb-20 mask-gradient-vertical"
                    ref={scrollContainerRef}
                >
                    <Outlet />
                </div>
                <Player />
            </div>
            <AppSideBar />
        </AppBg>
    );
};

const AppBg = (props: React.PropsWithChildren) => {
    const { bg } = useContext(AppBgContext);
    return (
        <div
            className="flex h-screen w-screen flex-row overflow-clip transition-[background-color] duration-200"
            style={{
                backgroundColor: `rgb(from ${bg.color} r g b / 10%)`,
            }}
        >
            {props.children}
        </div>
    );
};

export default App;
