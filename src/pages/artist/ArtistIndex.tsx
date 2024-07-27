import { MySavedArtistsSection } from '../my/MySavedArtists';
import { UserTopArtistSection } from './ArtistUserTop';

const PageArtistList = () => {
    return (
        <div className="pt-5">
            <MySavedArtistsSection />
            <UserTopArtistSection />
        </div>
    );
};

export const Component = PageArtistList;
