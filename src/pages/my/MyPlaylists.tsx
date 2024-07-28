import {
    PlaylistSeciton,
    PlaylistSectionSkeleton,
} from '../../components/playlist/PlaylistSection';
import { useSpotify } from '../../hooks/useSpotify';

const MyPlaylists = ({ showTopItems }: { showTopItems?: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'playlists', 'playlists'],
        queryKey: [showTopItems ? 6 : undefined],
    });

    if (isLoading) {
        return <PlaylistSectionSkeleton displayMode={showTopItems ? 'top-items' : 'all'} />;
    }
    if (!data) return <div>No data</div>;

    return (
        <PlaylistSeciton
            playlists={data.items}
            displayMode={showTopItems ? 'top-items' : 'all'}
            title="My playlists"
            link="/my/playlists"
        />
    );
};

export const MyPlaylistsSection = () => <MyPlaylists showTopItems />;

export const MyPlaylistsPage = () => <MyPlaylists />;

export const Component = MyPlaylistsPage;
