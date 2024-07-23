import { ArtistListSection } from '../../components/artist/ArtistListSection';
import { useSpotify } from '../../hooks/useSpotify';
import { UserTopArtistSection } from './ArtistTopList';

const PageArtistList = () => {
    return (
        <div className="pt-5">
            <UserFollowedArtistSection />
            <UserTopArtistSection showTopItems />
        </div>
    );
};

const UserFollowedArtistSection = () => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'followedArtists'],
        queryKey: [undefined, 6],
    });
    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <ArtistListSection
            artists={data.artists.items}
            displayMode="top-items"
            title="My followed artists"
            link="/my/artists"
        />
    );
};

export const Component = PageArtistList;
