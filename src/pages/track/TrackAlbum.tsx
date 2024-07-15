import { useParams } from 'react-router-dom';
import { AlbumCopyrights } from '../../components/album/AlbumCopyrights';
import { TrackList } from '../../components/TrackList';
import { useAlbumTracks } from '../../hooks/useAlbumTracks';
import { useSpotify } from '../../hooks/useSpotify';

export const TrackAlbum = () => {
    const { trackId } = useParams<{ trackId: string }>();

    const { tracks, album, isLoading } = useSameAlbumTracks(trackId);
    if (isLoading) return <div>Loading...</div>;
    if (!album) return <div>No album found!</div>;

    return (
        <div>
            <TrackList tracks={tracks} type="album" entityId={album.id} />
            <AlbumCopyrights className="p-8" album={album} />
        </div>
    );
};

const useSameAlbumTracks = (trackId?: string) => {
    const { data: [track] = [], isLoading } = useSpotify({
        enabled: !!trackId,
        api: ['tracks', 'get'],
        queryKey: [[trackId!]],
    });

    const data = useAlbumTracks(track?.album.id);
    return {
        ...data,
        isLoading: isLoading || data.isLoading,
    };
};
export const Component = TrackAlbum;
