import { useParams } from 'react-router-dom';
import { TrackList } from '../../components/TrackList';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';
import { useSpotify } from '../../hooks/useSpotify';

export const Component = () => {
    const { trackId } = useParams<{ trackId: string }>();

    const { data: track, isLoading: isLoadingTrack } = useSpotify(
        (api) => api.tracks.get(trackId!),
        {
            enabled: !!trackId,
            queryKey: [trackId],
        }
    );

    const {
        topTracks,
        artist,
        isLoading: isLoadingTopTracks,
    } = useArtistTopTracks(track?.artists?.[0].id);

    if (isLoadingTrack || isLoadingTopTracks) return <div>Loading...</div>;
    if (!artist || !topTracks) return <div>No artist found!</div>;

    return (
        <TrackList
            tracks={topTracks.tracks ?? []}
            type="artistPopularTracks"
            entityId={artist.id}
        />
    );
};
