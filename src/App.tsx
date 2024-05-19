import { AppSideBar } from './components/AppSideBar';
import { Player } from './components/Player';
import { SideMenuBar } from './components/SideMenuBar';

function App() {
    return (
        <div className="flex h-screen w-screen flex-row backdrop-blur-lg">
            <SideMenuBar />
            <div className="flex-1">
                <Player />
            </div>
            <AppSideBar />
        </div>
    );
}

export default App;
