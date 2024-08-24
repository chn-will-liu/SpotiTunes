import { PageContent } from '../../components/shell/PageContent';
import { PageHeader, PageHeaderSkeleton } from '../../components/shell/PageHeader';
import { TrackList, TrackListSkeleton } from '../../components/TrackList';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useSpotify } from '../../hooks/useSpotify';
import { likedSongsImage } from './linkedSongsImage';

export const PageFavorite = () => {
    const { data: userProfile } = useSpotify({
        api: ['currentUser', 'profile'],
        queryKey: [],
    });
    const { data: favorite, isLoading } = useSpotify({
        api: ['currentUser', 'tracks', 'savedTracks'],
        queryKey: [],
    });

    if (isLoading) return <PageFavoriteSkeleton />;
    if (!favorite) return <div>Error occured</div>;

    const tracks = favorite.items.map((item) => item.track);

    return (
        <>
            <PageHeader type="playlist" header="Liked Songs" images={likedSongsImage}>
                <div className="mb-2">
                    {userProfile?.display_name} • {favorite.items.length} songs
                </div>
                <TrackListPlayButton
                    tracks={tracks}
                    contextUri={`spotify:user:${userProfile?.id}:collection`}
                />
            </PageHeader>
            <PageContent>
                <TrackList
                    tracks={tracks}
                    contextUri={`spotify:user:${userProfile?.id}:collection`}
                />
            </PageContent>
        </>
    );
};

const PageFavoriteSkeleton = () => {
    return (
        <>
            <PageHeaderSkeleton type="playlist" />
            <PageContent>
                <TrackListSkeleton contextUri={`spotify:user:$any$:collection`} />
            </PageContent>
        </>
    );
};

export const Component = PageFavorite;
