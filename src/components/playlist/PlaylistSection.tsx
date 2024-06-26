import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { PlaylistCard } from './PlaylistCard';

export const PlaylistSection = ({
    playlists,
    title,
    link,
}: {
    playlists: SimplifiedPlaylist[];
    title: string;
    link: string;
}) => {
    return (
        <section className="px-2 py-5">
            <h1 className="flex justify-between px-3 font-semibold">
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
            <div className="grid py-2 auto-fill-[220px]">
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </section>
    );
};
