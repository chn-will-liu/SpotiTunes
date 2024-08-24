import { Link } from 'react-router-dom';
import { usePlayerState } from '../../hooks/usePlayer';
import { SpotiImage } from '../SpotiImage';

export const AlbumOfCurrentTrack = () => {
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);
    const images =
        currentTrack?.album.images.map((i) => ({
            ...i,
            width: i.width ?? 0,
            height: i.height ?? 0,
        })) ?? [];

    return (
        <Link to={`/album/${currentTrack?.album.uri.split(':')[2]}`}>
            <SpotiImage images={images} alt={currentTrack?.album.name ?? ''} size={114} />
        </Link>
    );
};
