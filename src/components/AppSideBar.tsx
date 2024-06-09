import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { MdLightMode } from 'react-icons/md';
import { TbSettings2 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { useSpotify } from '../Spotify/useSpotify';
import { IconButton } from './IconButton';

export const AppSideBar = () => {
    return (
        <div className="flex w-[98px] flex-shrink-0 flex-col items-center gap-8 border-l border-white border-opacity-25 py-8">
            <NavLink to="/my/favorite" className="block">
                <IconButton icon={GrFavorite} size="xl" />
            </NavLink>
            <IconButton icon={MdLightMode} size="xl" className="mt-auto" />
            <IconButton icon={TbSettings2} size="xl" />
            <UserAvatar />
        </div>
    );
};

const UserAvatar = () => {
    const { data: user } = useSpotify((api) => api.currentUser.profile());
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        if (user.images.length) {
            setAvatarUrl(user.images[0].url);
        } else {
            sha256(user.email).then((hashedEmail) => {
                setAvatarUrl(`https://www.gravatar.com/avatar/${hashedEmail}`);
            });
        }
    }, [user]);

    const avatar = avatarUrl ? (
        <img
            src={avatarUrl}
            alt="User avatar"
            className="outline-solid size-12 rounded-full outline-1 outline-offset-2 outline-gray-400"
        />
    ) : (
        <FaUserCircle className="size-12" />
    );

    return (
        <div title={user?.display_name} className="cursor-pointer">
            {avatar}
        </div>
    );
};

async function sha256(message: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
