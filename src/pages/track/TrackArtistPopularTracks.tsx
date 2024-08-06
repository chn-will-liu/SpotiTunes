import { useParams } from 'react-router-dom';
import { TrackList, TrackListSkeleton } from '../../components/TrackList';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';
import { useSpotify } from '../../hooks/useSpotify';

export const Component = () => {
    const { trackId } = useParams<{ trackId: string }>();

    const { data: [track] = [], isLoading: isLoadingTrack } = useSpotify({
        enabled: !!trackId,
        api: ['tracks', 'get'],
        queryKey: [[trackId!]],
    });

    const {
        topTracks,
        artist,
        isLoading: isLoadingTopTracks,
    } = useArtistTopTracks(track?.artists?.[0].id);

    if (isLoadingTrack || isLoadingTopTracks)
        return <TrackListSkeleton type="artistPopularTracks" />;
    if (!artist || !topTracks) return <div>No artist found!</div>;

    return (
        <TrackList
            tracks={topTracks.tracks ?? []}
            type="artistPopularTracks"
            entityId={artist.id}
        />
    );
};
