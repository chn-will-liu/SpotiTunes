import { Outlet } from 'react-router-dom';
import { AppSideBar } from './components/AppSideBar';
import { Player } from './components/Player';
import { SideMenuBar } from './components/SideMenuBar';

function App() {
    return (
        <div className="flex h-screen w-screen flex-row overflow-clip backdrop-blur-lg">
            <SideMenuBar />
            <div className="flex flex-1 flex-col">
                <div className="mask-gradient-vertical flex-1 overflow-auto pb-20">
                    <Outlet />
                </div>
                <Player />
            </div>
            <AppSideBar />
        </div>
    );
}

export default App;
