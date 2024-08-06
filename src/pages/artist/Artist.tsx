import { useParams } from 'react-router-dom';
import { PageContent } from '../../components/PageContent';
import { PageHeader, PageHeaderSkeleton } from '../../components/PageHeader';
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

    if (isLoading) return <PageArtistSkeleton />;
    if (!artist) return <div>Artist not found</div>;

    return (
        <div>
            <PageHeader type="artist" header={artist.name} images={artist.images}>
                <TrackListPlayButton
                    tracks={topTracks?.tracks ?? []}
                    type="artistPopularTracks"
                    entityId={artist?.id}
                />
                <span className="ml-4 text-sm">
                    {formatter.formatNumber(artist.followers.total)} followers
                </span>
            </PageHeader>
            <PageContent links={links} />
        </div>
    );
};

const PageArtistSkeleton = () => {
    return (
        <div>
            <PageHeaderSkeleton type="artist" />
            <PageContent links={links} isLoading />
        </div>
    );
};
export const Component = PageArtist;
