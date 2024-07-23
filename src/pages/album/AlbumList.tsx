import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { AlbumListSection } from '../../components/album/AlbumListSection';
import { useSpotify } from '../../hooks/useSpotify';
import { AlbumNewRelease } from './AlbumNewRelease';

const PageAlbumList = () => {
    return (
        <div className="pt-5">
            <UserSavedAlbumSection />
            <AlbumNewRelease showTopItems />
        </div>
    );
};

const UserSavedAlbumSection = () => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'albums', 'savedAlbums'],
        queryKey: [6],
    });
    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div>No data</div>;

    const albums = data.items.map<SimplifiedAlbum>((item) => ({
        ...item.album,
        album_group: 'album',
    }));

    return (
        <AlbumListSection
            albums={albums}
            displayMode="top-items"
            title="My saved albums"
            link="/my/albums"
        />
    );
};

export const Component = PageAlbumList;
