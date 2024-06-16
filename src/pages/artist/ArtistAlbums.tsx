import { useParams } from 'react-router-dom';
import { AlbumCard } from '../../components/AlbumCard';
import { useSpotify } from '../../hooks/useSpotify';

export const ArtistAlbums = () => {
    const { artistId } = useParams<{ artistId: string }>();

    const { data: albums, isLoading } = useSpotify((api) => api.artists.albums(artistId!), {
        queryKey: [artistId],
        enabled: !!artistId,
    });

    if (isLoading) return <div>Loading...</div>;
    if (!albums) return <div>No albums found</div>;
    return (
        <div className="grid px-4 py-8 auto-fit-[180px] ">
            {albums.items.map((album) => (
                <AlbumCard album={album} />
            ))}
        </div>
    );
};

export const Component = ArtistAlbums;
