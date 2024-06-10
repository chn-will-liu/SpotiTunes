import { useParams } from 'react-router-dom';
import { TrackList } from '../../components/TrackList';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';

export const ArtistPopular = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const { topTracks, artist, isLoading } = useArtistTopTracks(artistId!);

    if (isLoading) return <div>Loading...</div>;
    return (
        <TrackList
            tracks={topTracks?.tracks ?? []}
            type="artistPopularTracks"
            entityId={artist?.id}
        />
    );
};

export const Component = ArtistPopular;
