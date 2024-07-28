import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import {
    AlbumListSection,
    AlbumListSectionSkeleton,
} from '../../components/album/AlbumListSection';
import { useSpotify } from '../../hooks/useSpotify';

const MySavedAlbums = ({ showTopItems }: { showTopItems?: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'albums', 'savedAlbums'],
        queryKey: [showTopItems ? 6 : undefined],
    });
    if (isLoading) {
        return <AlbumListSectionSkeleton displayMode={showTopItems ? 'top-items' : 'all'} />;
    }
    if (!data) return <div>No data</div>;

    const albums = data.items.map<SimplifiedAlbum>((item) => ({
        ...item.album,
        album_group: 'album',
    }));

    return (
        <AlbumListSection
            albums={albums}
            displayMode={showTopItems ? 'top-items' : 'all'}
            title="My saved albums"
            link="/my/albums"
        />
    );
};

export const MySavedAlbumSection = () => <MySavedAlbums showTopItems />;
export const MySavedAlbumPage = () => <MySavedAlbums />;
export const Component = MySavedAlbumPage;
