import { IconType } from 'react-icons';
import { BsCassetteFill } from 'react-icons/bs';
import { FaCompass, FaSpotify } from 'react-icons/fa';
import { FaPodcast } from 'react-icons/fa6';
import { LuRadioTower } from 'react-icons/lu';
import { PiMicrophoneStageFill } from 'react-icons/pi';
import { RiHome6Fill } from 'react-icons/ri';
import { SearchBox } from './SearchBox';
import { SidePlaylists } from './SidePlaylists';
import { TrackPane } from './TrackPane';

export const SideMenuBar = () => {
    return (
        <div className="flex max-h-full w-[300px] flex-col">
            <div className="mx-6 mt-9 flex items-center">
                <FaSpotify color="white" size="42" />
                <span className="ml-3 text-2xl font-bold">SpotiTunes</span>
            </div>
            <SearchBox />
            <div className="overflow-auto px-6">
                <SideNav />
                <SidePlaylists />
            </div>
            <hr className="mx-6 mt-3 border-white border-opacity-25" />
            <TrackPane />
        </div>
    );
};

const SideNav = () => {
    return (
        <nav className="mb-8">
            <div className="mb-8 font-light text-white text-opacity-65">MENU</div>
            <ul>
                <SideNavItem icon={RiHome6Fill} text="Home" />
                <SideNavItem icon={FaCompass} text="Discover" />
                <SideNavItem icon={LuRadioTower} text="Radio" />
                <SideNavItem icon={PiMicrophoneStageFill} text="Artists" />
                <SideNavItem icon={BsCassetteFill} text="Albums" />
                <SideNavItem icon={FaPodcast} text="Podcasts" />
            </ul>
        </nav>
    );
};

const SideNavItem = ({ icon: Icon, text }: { icon: IconType; text: string }) => {
    return (
        <li className="group flex h-[48px] cursor-pointer flex-row items-center text-white text-opacity-70 hover:text-opacity-100">
            <Icon className="size-6 transform group-hover:scale-110" />
            <span className="ml-6">{text}</span>
        </li>
    );
};
