import { useParams } from 'react-router-dom';
import { TrackList, TrackListSkeleton } from '../../components/TrackList';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';

export const ArtistPopular = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const { topTracks, artist, isLoading } = useArtistTopTracks(artistId!);

    if (isLoading) return <TrackListSkeleton contextUri={`spotify:artist:${artistId}`} />;
    if (!artist || !topTracks) return <div>No artist found!</div>;

    return <TrackList tracks={topTracks.tracks ?? []} contextUri={`spotify:artist:${artistId}`} />;
};

export const Component = ArtistPopular;
