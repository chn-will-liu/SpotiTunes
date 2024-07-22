import { PlaylistList } from '../../components/playlist/PlaylistList';
import { useSpotify } from '../../hooks/useSpotify';

const PopularPlaylists = ({ showTopItems }: { showTopItems: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['browse', 'getFeaturedPlaylists'],
        queryKey: [undefined, undefined, undefined, showTopItems ? 6 : undefined],
    });
    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div>no data</div>;

    return (
        <PlaylistList
            title={data.message}
            playlists={data.playlists.items}
            displayMode={showTopItems ? 'top-items' : 'all'}
            link="/playlist/popular"
        />
    );
};

export const TopPopularPlaylists = () => {
    return <PopularPlaylists showTopItems={true} />;
};

export const PopularPlaylistPage = () => {
    return <PopularPlaylists showTopItems={false} />;
};

export const Component = PopularPlaylistPage;
