import { PlaylistSection } from '../../components/playlist/PlaylistSection';
import { useSpotify } from '../../hooks/useSpotify';

export const PageHome = () => {
    return (
        <div className="pt-5">
            <PopularPlaylists />
            <TopCategories />
        </div>
    );
};

const PopularPlaylists = () => {
    const { data, isLoading } = useSpotify((api) =>
        api.browse.getFeaturedPlaylists(undefined, undefined, undefined, 6)
    );
    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div>no data</div>;

    return (
        <PlaylistSection
            title={data.message}
            playlists={data.playlists.items}
            link="/poppular-playlists"
        />
    );
};

const TopCategories = () => {
    const { data, isLoading } = useSpotify((api) =>
        api.browse.getCategories(undefined, undefined, 6)
    );

    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div></div>;

    return (
        <>
            {data.categories.items.map((category) => (
                <CategoryTopPlaylists
                    key={category.id}
                    categoryId={category.id}
                ></CategoryTopPlaylists>
            ))}
        </>
    );
};

const CategoryTopPlaylists = ({ categoryId }: { categoryId: string }) => {
    const { data, isLoading } = useSpotify(
        (api) => api.browse.getPlaylistsForCategory(categoryId, undefined, 6),
        {
            queryKey: [categoryId],
            enabled: !!categoryId,
        }
    );

    if (isLoading) return <div>is loading...</div>;
    if (!data) return <div></div>;
    return (
        <PlaylistSection
            title={data.message}
            playlists={data.playlists.items}
            link={'/category/' + categoryId}
        />
    );
};

export const Component = PageHome;
