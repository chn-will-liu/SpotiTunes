import { IconType } from 'react-icons';
import { BiLibrary } from 'react-icons/bi';
import { BsCassetteFill } from 'react-icons/bs';
import { FaCompass, FaSpotify } from 'react-icons/fa';
import { FaPodcast } from 'react-icons/fa6';
import { LuRadioTower } from 'react-icons/lu';
import { PiMicrophoneStageFill } from 'react-icons/pi';
import { RiHome6Fill } from 'react-icons/ri';
import { SearchBox } from './SearchBox';
import { TrackPane } from './TrackPane';

export const SideMenuBar = () => {
    return (
        <div className="dust-bg flex max-h-full w-[300px] flex-col">
            <div className="mx-6 mt-9 flex items-center">
                <FaSpotify color="white" size="42" />
                <span className="ml-3 text-2xl font-bold">SpotiTunes</span>
            </div>
            <SearchBox />
            <div className="flex-shrink-1 flex-1 overflow-auto px-6 mask-gradient-vertical">
                <SideNav />
                {/* <SidePlaylists /> */}
            </div>
            <TrackPane />
        </div>
    );
};

const SideNav = () => {
    return (
        <nav className="mb-8">
            {/* <div className="mb-8 font-light text-white text-opacity-65">MENU</div> */}
            <ul>
                <SideNavItem icon={RiHome6Fill} text="Home" />
                <SideNavItem icon={FaCompass} text="Discover" />
                <SideNavItem icon={BiLibrary} text="My Library" />
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
