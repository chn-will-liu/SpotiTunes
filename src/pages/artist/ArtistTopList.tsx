import { Artist } from '@spotify/web-api-ts-sdk';
import { ArtistListSection } from '../../components/artist/ArtistListSection';
import { useSpotify } from '../../hooks/useSpotify';

export const UserTopArtistSection = ({ showTopItems }: { showTopItems: boolean }) => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'topItems'],
        queryKey: ['artists', 'medium_term', showTopItems ? 6 : undefined],
    });

    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <ArtistListSection
            artists={data.items as Artist[]}
            displayMode={showTopItems ? 'top-items' : 'all'}
            title="Top artists"
            link="/artist/top"
        />
    );
};

const PageUserTopArtist = () => {
    return <UserTopArtistSection showTopItems={false} />;
};

export const Component = PageUserTopArtist;
