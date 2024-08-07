import {
    PlaylistSeciton,
    PlaylistSectionSkeleton,
} from '../../components/playlist/PlaylistSection';
import { useSpotify } from '../../hooks/useSpotify';

const PopularPlaylists = ({ showTopItems }: { showTopItems: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['browse', 'getFeaturedPlaylists'],
        queryKey: [undefined, undefined, undefined, showTopItems ? 6 : undefined],
    });
    if (isLoading) {
        return <PlaylistSectionSkeleton displayMode={showTopItems ? 'top-items' : 'all'} />;
    }
    if (!data) return <div>no data</div>;

    return (
        <PlaylistSeciton
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
