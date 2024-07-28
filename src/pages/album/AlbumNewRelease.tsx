import {
    AlbumListSection,
    AlbumListSectionSkeleton,
} from '../../components/album/AlbumListSection';
import { useSpotify } from '../../hooks/useSpotify';

export const AlbumNewRelease = ({ showTopItems }: { showTopItems?: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['browse', 'getNewReleases'],
        queryKey: [undefined, showTopItems ? 6 : undefined],
    });

    if (isLoading) {
        return <AlbumListSectionSkeleton displayMode={showTopItems ? 'top-items' : 'all'} />;
    }
    if (!data) return <div>No data</div>;

    return (
        <AlbumListSection
            albums={data.albums.items}
            displayMode={showTopItems ? 'top-items' : 'all'}
            title="New releases"
            link="/album/new-releases"
        />
    );
};

export const PageAlbumNewRelease = () => {
    return <AlbumNewRelease />;
};

export const Component = PageAlbumNewRelease;
