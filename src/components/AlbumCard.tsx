import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { SpotiGreenButton } from './SpotiGreenButton';
import { SpotiImage } from './SpotiImage';

export const AlbumCard = ({ album }: { album: SimplifiedAlbum }) => {
    return (
        <Link
            key={album.id}
            title={album.name}
            to={'/album/' + album.id}
            className="group rounded-md p-3 hover:bg-black hover:bg-opacity-45"
        >
            <div className="relative">
                <SpotiImage
                    images={album.images}
                    alt={album.name}
                    size={180}
                    displaySize="full"
                    className="mb-2"
                />
                <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpotiGreenButton type="play" />
                </div>
            </div>
            <div className="line-clamp-1" title={album.name}>
                {album.name}
            </div>
            <div className="text-sm text-white text-opacity-65">
                {album.release_date} • {album.album_type}
            </div>
        </Link>
    );
};
