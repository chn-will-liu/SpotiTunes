import { FaPlus, FaRegTrashCan } from 'react-icons/fa6';
import { TbPlaylist } from 'react-icons/tb';
import { IconButton } from './IconButton';

export const SidePlaylists = () => {
    return (
        <div className="mb-6">
            <div className="mb-8 flex items-center justify-between font-light text-white text-opacity-65">
                <span>PLAYLISTS</span>
                <IconButton icon={FaPlus} size="sm" />
            </div>
            <ul>
                <PlaylistItem title="Top Hit 2021-USA" />
                <PlaylistItem title="Dance" />
                <PlaylistItem title="Discover Weekly 2001 Discover Weekly 2001" />
            </ul>
        </div>
    );
};

type PlaylistItemProps = { title: string };
const PlaylistItem = ({ title }: PlaylistItemProps) => {
    return (
        <li className="group flex cursor-pointer gap-3 py-4 text-white text-opacity-65 hover:text-opacity-100">
            <TbPlaylist className="size-6 transform group-hover:scale-110" />
            <span className="flex-1 overflow-hidden whitespace-nowrap mask-gradient">{title}</span>
            <IconButton icon={FaRegTrashCan} size="md" hoverEffect="opacity" />
        </li>
    );
};
