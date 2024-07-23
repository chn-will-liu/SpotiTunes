import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { PageTextHeader } from '../PageTextHeader';
import { PlaylistCard } from './PlaylistCard';

export type PlaylistSecitonProps = {
    playlists: SimplifiedPlaylist[];
    title: string;
    displayMode: 'all' | 'top-items';
    link: string;
};

export const PlaylistSeciton = ({ playlists, displayMode, title, link }: PlaylistSecitonProps) => {
    const items = (
        <div className="grid px-2 py-2 auto-fill-[220px]">
            {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
        </div>
    );

    return displayMode === 'top-items' ? (
        <section className="py-5">
            <h1 className="flex justify-between px-5 font-semibold">
                <Link to={link} className="text-2xl hover:underline">
                    {title}
                </Link>
                <Link
                    to={link}
                    className="text-sm text-white text-opacity-65 hover:text-opacity-100 hover:underline"
                >
                    Show all
                </Link>
            </h1>
            {items}
        </section>
    ) : (
        <>
            <PageTextHeader>{title}</PageTextHeader>
            {items}
        </>
    );
};
