import { Track } from '@spotify/web-api-ts-sdk';
import { useParams } from 'react-router-dom';
import { PageContent } from '../../components/PageContent';
import { PageHeader, PageHeaderSkeleton } from '../../components/PageHeader';
import { TextWithHref } from '../../components/TextWithHref';
import { TrackList, TrackListSkeleton } from '../../components/TrackList';
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

    if (isLoading) {
        return <PagePlaylistSkeleton />;
    }

    if (!playlist) return <div>No playlist found!</div>;

    const tracks = playlist.tracks.items
        .map((track) => track.track)
        .filter((track): track is Track => isTrack(track));

    return (
        <div>
            <PageHeader type="playlist" header={playlist.name} images={playlist.images}>
                <div className="flex items-center">
                    <TrackListPlayButton tracks={tracks} type="playlist" entityId={playlist.id} />
                    <div className="ml-4 shrink align-bottom text-sm">
                        <TextWithHref text={playlist.description} />
                        <div>
                            {playlist.owner.display_name} • {playlist.followers.total} •{' '}
                            <span>{playlist.tracks.items.length} songs </span>
                        </div>
                    </div>
                </div>
            </PageHeader>
            <PageContent>
                <TrackList tracks={tracks} type="playlist" entityId={playlist.id} />
            </PageContent>
        </div>
    );
};

const PagePlaylistSkeleton = () => {
    return (
        <>
            <PageHeaderSkeleton type="playlist" />
            <PageContent>
                <TrackListSkeleton type="playlist" />
            </PageContent>
        </>
    );
};

export const Component = PagePlaylist;
