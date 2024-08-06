import { useParams } from 'react-router-dom';
import { TrackList, TrackListSkeleton } from '../../components/TrackList';
import { useTrackRecommendations } from '../../hooks/useTrackRecommendations';

export const TrackRecommended = () => {
    const { trackId } = useParams<{ trackId: string }>();
    const { tracks, isLoading } = useTrackRecommendations(trackId);
    if (isLoading) return <TrackListSkeleton type="trackRecommendations" />;
    if (!tracks) return <div>No tracks found</div>;

    return <TrackList type="trackRecommendations" tracks={tracks} entityId={trackId!} />;
};

export const Component = TrackRecommended;
