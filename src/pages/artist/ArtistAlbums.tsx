import { useParams } from 'react-router-dom';
import { AlbumCard } from '../../components/album/AlbumCard';
import { useSpotify } from '../../hooks/useSpotify';

export const ArtistAlbums = () => {
    const { artistId } = useParams<{ artistId: string }>();

    const { data: albums, isLoading } = useSpotify({
        api: ['artists', 'albums'],
        queryKey: [artistId!],
        enabled: !!artistId,
    });

    if (isLoading) return <div>Loading...</div>;
    if (!albums) return <div>No albums found</div>;
    return (
        <div className="grid p-4 auto-fit-[180px]">
            {albums.items.map((album) => (
                <AlbumCard album={album} key={album.id} />
            ))}
        </div>
    );
};

export const Component = ArtistAlbums;
