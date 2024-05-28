import { useSpotify } from '../Spotify/useSpotify';
import { TrackList } from './TrackList';

export const PageFavorite = () => {
    const [favorite] = useSpotify((api) => api.currentUser.tracks.savedTracks());
    if (!favorite) return <div>Loading...</div>;

    return (
        <div>
            <div>Favorite</div>
            <div>
                <TrackList tracks={favorite} type="savedTracks" />
            </div>
        </div>
    );
};
