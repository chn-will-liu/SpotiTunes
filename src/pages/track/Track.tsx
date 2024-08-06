import { Track } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtistLinkList } from '../../components/artist/ArtistLinkList';
import { PageContent } from '../../components/PageContent';
import { PageHeader, PageHeaderSkeleton } from '../../components/PageHeader';
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

    const { data: [track] = [], isLoading } = useSpotify({
        enabled: !!trackId,
        api: ['tracks', 'get'],
        queryKey: [[trackId!]],
    });
    const { tracks: recommendedTracks, isLoading: isRecomendationLoading } =
        useTrackRecommendations(trackId);

    if (isLoading || isRecomendationLoading) {
        return <PageTrackSkeleton />;
    }
    if (!track || !recommendedTracks) return <div>Track not found</div>;

    return (
        <div>
            <PageHeader type="song" header={track.name} images={track.album.images}>
                <TrackListPlayButton
                    tracks={[track, ...recommendedTracks]}
                    type="trackRecommendations"
                    entityId={trackId!}
                />
                <TrackMetadata track={track} />
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
        <span className="ml-4 text-sm">
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

const PageTrackSkeleton = () => {
    return (
        <>
            <PageHeaderSkeleton type="song" />
            <PageContent links={links} isLoading></PageContent>
        </>
    );
};
export const Component = PageTrack;
