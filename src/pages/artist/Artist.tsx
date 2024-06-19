import { useParams } from 'react-router-dom';
import { PageContent } from '../../components/PageContent';
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
                <span className="mr-4 text-sm">
                    {formatter.formatNumber(artist.followers.total)} followers
                </span>
                <TrackListPlayButton
                    tracks={topTracks?.tracks ?? []}
                    type="artistPopularTracks"
                    entityId={artist?.id}
                />
            </PageHeader>
            <PageContent links={links} />
        </div>
    );
};

export const Component = PageArtist;
