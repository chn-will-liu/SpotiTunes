import { useParams } from 'react-router-dom';
import { RelatedArtists } from '../../components/artist/RelatedArtist';
import { useSpotify } from '../../hooks/useSpotify';

export const TrackArtistRelated = () => {
    const { trackId } = useParams<{ trackId: string }>();
    const { data: [track] = [], isLoading } = useSpotify({
        enabled: !!trackId,
        api: ['tracks', 'get'],
        queryKey: [[trackId!]],
    });

    if (isLoading) return <RelatedArtists artistId={null} />;
    if (!track) return <div>Track not found</div>;

    return <RelatedArtists artistId={track.artists[0].id} />;
};

export const Component = TrackArtistRelated;
