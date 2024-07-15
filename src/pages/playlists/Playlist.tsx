import { useParams } from 'react-router-dom';
import { PageContent } from '../../components/PageContent';
import { PageHeader } from '../../components/PageHeader';
import { TrackList } from '../../components/TrackList';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useSpotify } from '../../hooks/useSpotify';
import { isTrack } from '../../utils';

export const PagePlaylist = () => {
    const { playlistId } = useParams<{ playlistId: string }>();

    const { data: playlist, isLoading } = useSpotify({
        api: ['playlists', 'getPlaylist'],
        queryKey: [playlistId!],
        enabled: !!playlistId,
    });

    if (isLoading) return <div>Loading...</div>;

    if (!playlist) return <div>No playlist found!</div>;

    const tracks = playlist.tracks.items
        .map((track) => track.track)
        .filter((track) => isTrack(track));

    return (
        <div>
            <PageHeader type="Playlist" header={playlist.name} images={playlist.images}>
                <span className="mr-4 text-sm">
                    {playlist.owner.display_name} • {playlist.followers.total} •{' '}
                    <span>{playlist.tracks.items.length} songs </span>
                </span>
                <TrackListPlayButton tracks={tracks} type="playlist" entityId={playlist.id} />
            </PageHeader>
            <PageContent>
                <TrackList tracks={tracks} type="album" entityId={playlist.id} />
            </PageContent>
        </div>
    );
};

export const Component = PagePlaylist;
