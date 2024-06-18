import { useParams } from 'react-router-dom';
import { RelatedArtists } from '../../components/RelatedArtist';
import { useSpotify } from '../../hooks/useSpotify';

export const TrackArtistRelated = () => {
    const { trackId } = useParams<{ trackId: string }>();
    const { data: track, isLoading } = useSpotify((api) => api.tracks.get(trackId!), {
        enabled: !!trackId,
        queryKey: [trackId],
    });

    if (isLoading) return <div>Loading...</div>;
    if (!track) return <div>Track not found</div>;

    return <RelatedArtists artistId={track.artists[0].id} />;
};

export const Component = TrackArtistRelated;
