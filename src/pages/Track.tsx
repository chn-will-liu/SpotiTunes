import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useSpotify } from '../hooks/useSpotify';

export const PageTrack = () => {
    const { trackId } = useParams<{ trackId: string }>();

    const { data: track, isLoading } = useSpotify((api) => api.tracks.get(trackId!), {
        enabled: !!trackId,
        queryKey: [trackId],
    });

    if (isLoading) return <div>Loading...</div>;
    if (!track) return <div>Track not found</div>;

    return (
        <div>
            <PageHeader type="Song" header={track.name} images={track.album.images} />
        </div>
    );
};
