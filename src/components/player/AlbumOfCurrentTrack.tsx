import { Link } from 'react-router-dom';
import { usePlayerState } from '../../hooks/usePlayer';
import { SpotiImage } from '../SpotiImage';

export const AlbumOfCurrentTrack = () => {
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);

    return (
        <Link to={`/album/${currentTrack?.album.id}`}>
            <SpotiImage
                images={currentTrack?.album.images ?? []}
                alt={currentTrack?.album.name ?? ''}
                size={114}
            />
        </Link>
    );
};
