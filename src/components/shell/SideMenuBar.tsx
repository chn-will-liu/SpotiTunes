import { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { BiLibrary } from 'react-icons/bi';
import { BsCassetteFill } from 'react-icons/bs';
import { FaCompass, FaSpotify } from 'react-icons/fa';
import { FaPodcast } from 'react-icons/fa6';
import { LuRadioTower } from 'react-icons/lu';
import { PiMicrophoneStageFill } from 'react-icons/pi';
import { RiHome6Fill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { NavigationButtons } from '../NavigationButtons';
import { SearchBox } from '../SearchBox';
import { TrackPane } from '../trackPane/TrackPane';

export const SideMenuBar = () => {
    return (
        <div className="dust-bg flex max-h-full max-w-[300px] flex-col">
            <div className="mx-6 mt-9 flex items-center">
                <FaSpotify color="white" size="42" />
                <span className="ml-3 text-xl font-bold">SpotiTunes</span>
                <NavigationButtons />
            </div>
            <SearchBox />
            <div className="flex-shrink-1 flex-1 px-6">
                <SideNav />
            </div>
            <TrackPane />
        </div>
    );
};

const SideNav = () => {
    const navRef = useRef<HTMLElement | null>(null);
    const [top, setTop] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (navRef.current) {
            const activeItem = navRef.current.querySelector('nav > ul > li > a.active');
            if (activeItem) {
                setTop(
                    activeItem.getBoundingClientRect().top -
                        navRef.current.getBoundingClientRect().top
                );
            } else {
                setTop(-1);
            }
        }
    }, [navRef, top, location.pathname]);

    return (
        <nav className="relative mb-8" ref={navRef}>
            {/* <div className="mb-8 font-light text-white text-opacity-65">MENU</div> */}
            <ul>
                <SideNavItem icon={RiHome6Fill} text="Home" to="/" />
                <SideNavItem icon={FaCompass} text="Discover" to="/discover" />
                <SideNavItem icon={BiLibrary} text="My Library" to="/my" />
                <SideNavItem icon={LuRadioTower} text="Radio" to="/radio" />
                <SideNavItem icon={PiMicrophoneStageFill} text="Artists" to="/artist" />
                <SideNavItem icon={BsCassetteFill} text="Albums" to="/album" />
                <SideNavItem icon={FaPodcast} text="Podcasts" to="podcasts" />
            </ul>
            <div
                className="absolute -left-6 h-[48px] w-[6px] rounded-e-sm bg-current
             text-spotiGreen shadow-[6px_0px_24px_3px_currentColor] transition-all duration-200"
                style={{ top, display: top === -1 ? 'none' : 'block' }}
            ></div>
        </nav>
    );
};

const SideNavItem = ({ icon: Icon, text, to }: { icon: IconType; text: string; to: string }) => {
    return (
        <li>
            <NavLink
                to={to}
                className="group flex h-[48px] cursor-pointer flex-row items-center text-white text-opacity-70 hover:text-opacity-100 [&.active]:text-opacity-100"
            >
                <Icon className="size-6 transform group-hover:scale-110 group-[.active]:scale-110" />
                <span className="ml-6 group-[.active]:font-bold">{text}</span>
            </NavLink>
        </li>
    );
};
