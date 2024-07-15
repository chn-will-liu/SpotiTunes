import { Link, useParams } from 'react-router-dom';
import { AlbumCard } from '../../components/album/AlbumCard';
import { AlbumCopyrights } from '../../components/album/AlbumCopyrights';
import { ArtistLinkList } from '../../components/artist/ArtistLinkList';
import { PageContent } from '../../components/PageContent';
import { PageHeader } from '../../components/PageHeader';
import { TrackList } from '../../components/TrackList';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useAlbumTracks } from '../../hooks/useAlbumTracks';
import { useSpotify } from '../../hooks/useSpotify';

export const PageAlbum = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const { album, tracks, isLoading } = useAlbumTracks(albumId);

    if (isLoading) return <div>Loading...</div>;
    if (!album) return <div>No album found!</div>;

    const artist = album.artists[0];

    return (
        <div>
            <PageHeader type="Album" header={album.name} images={album.images}>
                <span className="mr-4 text-sm">
                    <ArtistLinkList artists={album.artists} /> • {album.release_date} •{' '}
                    <span>{album.tracks.items.length} songs</span>
                </span>
                <TrackListPlayButton tracks={tracks} type="album" entityId={album.id} />
            </PageHeader>
            <PageContent>
                <TrackList tracks={tracks} type="album" entityId={album.id} />
                <AlbumCopyrights className="p-8" album={album} />
                <MoreByArtist artistId={artist.id} name={artist.name} />
            </PageContent>
        </div>
    );
};

export const MoreByArtist = ({ artistId, name }: { artistId: string; name: string }) => {
    const { data: albums, isLoading } = useSpotify({
        api: ['artists', 'albums'],
        queryKey: [artistId, 'album', undefined, 4],
        enabled: !!artistId,
    });

    if (isLoading || !albums || !albums.items.length) return null;

    return (
        <>
            <Link
                className="mb-2 ml-8 text-xl text-white hover:underline"
                to={`/artist/${artistId}/albums`}
            >
                More by {name}
            </Link>
            <div className="grid px-5 py-2 auto-fill-[180px] ">
                {albums.items.map((album) => (
                    <AlbumCard album={album} key={album.id} />
                ))}
            </div>
        </>
    );
};

export const Component = PageAlbum;
