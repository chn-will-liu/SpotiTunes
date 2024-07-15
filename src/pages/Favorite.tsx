import likedSongsImageUrl from '../assets/liked-songs.png';
import { PageContent } from '../components/PageContent';
import { PageHeader } from '../components/PageHeader';
import { TrackList } from '../components/TrackList';
import { TrackListPlayButton } from '../components/TrackListPlayButton';
import { useSpotify } from '../hooks/useSpotify';

const likedSongsImage = [{ url: likedSongsImageUrl, width: 300, height: 300 }];

export const PageFavorite = () => {
    const { data: userProfile } = useSpotify({
        api: ['currentUser', 'profile'],
        queryKey: [],
    });
    const { data: favorite, isLoading } = useSpotify({
        api: ['currentUser', 'tracks', 'savedTracks'],
        queryKey: [],
    });

    if (isLoading) return <div>Loading...</div>;
    if (!favorite) return <div>Error occured</div>;

    const tracks = favorite.items.map((item) => item.track);

    return (
        <>
            <PageHeader type="Playlist" header="Liked Songs" images={likedSongsImage}>
                <div className="mb-2">
                    {userProfile?.display_name} • {favorite.items.length} songs
                </div>
                <TrackListPlayButton tracks={tracks} type="savedTracks" />
            </PageHeader>
            <PageContent>
                <TrackList tracks={tracks} type="savedTracks" />
            </PageContent>
        </>
    );
};

export const Component = PageFavorite;
