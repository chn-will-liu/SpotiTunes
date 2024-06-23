import { Track } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtistLinkList } from '../../components/artist/ArtistLinkList';
import { PageContent } from '../../components/PageContent';
import { PageHeader } from '../../components/PageHeader';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useFormatter } from '../../hooks/useFormatter';
import { useSpotify } from '../../hooks/useSpotify';
import { useTrackRecommendations } from '../../hooks/useTrackRecommendations';

const links = [
    {
        label: 'Recomended',
        to: '',
    },
    {
        label: 'Artist Popular',
        to: './artist-tracks',
    },
    {
        label: 'From the ablum',
        to: './album-tracks',
    },
    {
        label: 'Fans also like',
        to: './related-artists',
    },
];

export const PageTrack = () => {
    const { trackId } = useParams<{ trackId: string }>();

    const { data: track, isLoading } = useSpotify((api) => api.tracks.get(trackId!), {
        enabled: !!trackId,
        queryKey: [trackId],
    });
    const { tracks: recommendedTracks, isLoading: isRecomendationLoading } =
        useTrackRecommendations(trackId);

    if (isLoading || isRecomendationLoading) return <div>Loading...</div>;
    if (!track || !recommendedTracks) return <div>Track not found</div>;

    return (
        <div>
            <PageHeader type="Song" header={track.name} images={track.album.images}>
                <TrackMetadata track={track} />
                <TrackListPlayButton
                    tracks={[track, ...recommendedTracks]}
                    type="trackRecommendations"
                    entityId={trackId!}
                />
            </PageHeader>
            <PageContent links={links} />
        </div>
    );
};

const TrackMetadata = ({ track }: { track: Track }) => {
    const formatter = useFormatter();
    const year = useMemo(
        () => new Date(track.album.release_date).getFullYear(),
        [track.album.release_date]
    );
    const duration = useMemo(
        () => formatter.formatDurationMs(track.duration_ms),
        [track.duration_ms, formatter]
    );

    return (
        <span className="mr-4 text-sm">
            <ArtistLinkList artists={track.artists} className="font-bold" usePrimaryColor />
            <span> • </span>
            <Link to={'/album/' + track.album.id} className="hover:underline">
                {track.album.name}
            </Link>
            <span> • </span>
            <span>{year}</span>
            <span> • </span>
            <span>{duration}</span>
        </span>
    );
};

export const Component = PageTrack;
