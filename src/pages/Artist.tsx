import { Market } from '@spotify/web-api-ts-sdk';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { TrackList } from '../components/TrackList';
import { TrackListPlayButton } from '../components/TrackListPlayButton';
import { useFormatter } from '../hooks/useFormatter';
import { useSpotify } from '../Spotify/useSpotify';

export const PageArtist = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const formatter = useFormatter();

    const { data: artist, isLoading } = useSpotify((api) => api.artists.get(artistId!), {
        enabled: !!artistId,
        queryKey: [artistId],
    });

    const { data: user } = useSpotify((api) => api.currentUser.profile());

    const { data: topTracks } = useSpotify(
        (api) => api.artists.topTracks(artistId!, user?.country as Market),
        {
            enabled: !!artistId && !!user?.country,
            queryKey: [artistId, user?.country],
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (!artist) return <div>Artist not found</div>;

    return (
        <div>
            <PageHeader type="Artist" header={artist.name} images={artist.images}>
                <div>{formatter.formatNumber(artist.followers.total)} followers</div>
            </PageHeader>
            <div className="flex h-20 items-center bg-black bg-opacity-35 px-6">
                <TrackListPlayButton tracks={topTracks?.tracks ?? []} type="artistPopularTracks" />
            </div>
            <TrackList tracks={topTracks?.tracks ?? []} type="artistPopularTracks" />
        </div>
    );
};
