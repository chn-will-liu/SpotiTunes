import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSideBar } from './components/AppSideBar';
import { ThemeColorContext } from './components/AppThemeColor';
import { Player } from './components/player/Player';
import { SideMenuBar } from './components/SideMenuBar';

const App = () => {
    return (
        <AppBg>
            <SideMenuBar />
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="relative flex-1 overflow-auto pb-20 mask-gradient-vertical">
                    <Outlet />
                </div>
                <Player />
            </div>
            <AppSideBar />
        </AppBg>
    );
};

const AppBg = (props: React.PropsWithChildren) => {
    const { color } = useContext(ThemeColorContext);
    return (
        <div
            className="flex h-screen w-screen flex-row overflow-clip transition-[background-color] duration-200"
            style={{
                backgroundColor: `rgb(from ${color} r g b / 10%)`,
            }}
        >
            {props.children}
        </div>
    );
};

export default App;
