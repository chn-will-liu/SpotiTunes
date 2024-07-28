import {
    ArtistListSection,
    ArtistListSectionSkeleton,
} from '../../components/artist/ArtistListSection';
import { useSpotify } from '../../hooks/useSpotify';

export const MySavedArtists = ({ showTopItems }: { showTopItems: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'followedArtists'],
        queryKey: [undefined, showTopItems ? 6 : undefined],
    });
    if (isLoading) {
        return <ArtistListSectionSkeleton displayMode={showTopItems ? 'top-items' : 'all'} />;
    }
    if (!data) return <div>No data</div>;

    return (
        <ArtistListSection
            artists={data.artists.items}
            displayMode={showTopItems ? 'top-items' : 'all'}
            title="My followed artists"
            link="/my/artists"
        />
    );
};

const PageMySavedArtists = () => {
    return <MySavedArtists showTopItems={false} />;
};

export const MySavedArtistsSection = () => <MySavedArtists showTopItems />;
export const Component = PageMySavedArtists;
