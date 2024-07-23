import { useParams } from 'react-router-dom';
import { PlaylistSeciton } from '../../components/playlist/PlaylistSection';
import { useSpotify } from '../../hooks/useSpotify';

type CategoryPlaylistsProps = {
    categoryId: string;
    showTopItems?: boolean;
};

const CategoryPlaylists = ({ categoryId, showTopItems }: CategoryPlaylistsProps) => {
    const { data, isLoading } = useSpotify({
        api: ['browse', 'getPlaylistsForCategory'],
        queryKey: [categoryId, undefined, showTopItems ? 6 : undefined],
        enabled: !!categoryId,
    });

    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div></div>;
    return (
        <PlaylistSeciton
            title={data.message}
            playlists={data.playlists.items}
            displayMode={showTopItems ? 'top-items' : 'all'}
            link={'/category/' + categoryId}
        />
    );
};

export const CategoryTopPlaylists = ({ categoryId }: { categoryId: string }) => {
    return <CategoryPlaylists categoryId={categoryId} showTopItems />;
};

export const PageCategory = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    if (!categoryId) return <div>Category not found</div>;
    return <CategoryPlaylists categoryId={categoryId} />;
};

export const Component = PageCategory;
