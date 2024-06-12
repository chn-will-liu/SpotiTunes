import { NavLink, useParams } from 'react-router-dom';
import { AlbumImage } from '../../components/AlbumImage';
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
        <div className="auto-fit-[180px] grid gap-5 p-8">
            {albums.items.map((album) => (
                <NavLink key={album.id} title={album.name} to={'/ablum/' + album.id}>
                    <AlbumImage
                        images={album.images}
                        alt={album.name}
                        size={180}
                        displaySize="full"
                        className="mb-2"
                    />
                    <div className="line-clamp-1" title={album.name}>
                        {album.name}
                    </div>
                    <div className="text-sm text-white text-opacity-65">
                        {album.release_date} • {album.album_type}
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export const Component = ArtistAlbums;
