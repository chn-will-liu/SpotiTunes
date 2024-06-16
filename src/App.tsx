import { Outlet } from 'react-router-dom';
import { AppSideBar } from './components/AppSideBar';
import { Player } from './components/player/Player';
import { SideMenuBar } from './components/SideMenuBar';

function App() {
    return (
        <div className="flex h-screen w-screen flex-row overflow-clip">
            <SideMenuBar />
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="relative flex-1 overflow-auto pb-20 mask-gradient-vertical">
                    <Outlet />
                </div>
                <Player />
            </div>
            <AppSideBar />
        </div>
    );
}

export default App;
