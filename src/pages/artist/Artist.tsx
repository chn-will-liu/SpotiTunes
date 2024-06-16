import { Outlet, useParams } from 'react-router-dom';
import { NavList } from '../../components/NavList';
import { PageHeader } from '../../components/PageHeader';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';
import { useFormatter } from '../../hooks/useFormatter';

const links = [
    {
        label: 'Popular',
        to: '',
    },
    {
        label: 'Albums',
        to: './albums',
    },
    {
        label: 'Fans also like',
        to: './related',
    },
];

export const PageArtist = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const formatter = useFormatter();

    const { topTracks, artist, isLoading } = useArtistTopTracks(artistId!);

    if (isLoading) return <div>Loading...</div>;
    if (!artist) return <div>Artist not found</div>;

    return (
        <div>
            <PageHeader type="Artist" header={artist.name} images={artist.images}>
                <div>{formatter.formatNumber(artist.followers.total)} followers</div>
            </PageHeader>
            <nav className="relative flex h-20 items-center gap-5 bg-black bg-opacity-35 px-6">
                <NavList links={links} />
                <TrackListPlayButton
                    tracks={topTracks?.tracks ?? []}
                    type="artistPopularTracks"
                    entityId={artist?.id}
                />
            </nav>
            <Outlet />
        </div>
    );
};

export const Component = PageArtist;
