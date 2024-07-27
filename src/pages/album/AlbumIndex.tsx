import { MySavedAlbumSection } from '../my/MySavedAlbums';
import { AlbumNewRelease } from './AlbumNewRelease';

const PageAlbumIndex = () => {
    return (
        <div className="pt-5">
            <MySavedAlbumSection />
            <AlbumNewRelease showTopItems />
        </div>
    );
};

export const Component = PageAlbumIndex;
