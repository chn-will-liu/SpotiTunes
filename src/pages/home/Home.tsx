import { useSpotify } from '../../hooks/useSpotify';
import { CategoryPlaylistsSkeleton, CategoryTopPlaylists } from '../category/Category';
import { TopPopularPlaylists } from '../playlists/PopularPlaylists';

export const PageHome = () => {
    return (
        <div className="pt-5">
            <TopPopularPlaylists />
            <TopCategories />
        </div>
    );
};

const TopCategories = () => {
    const { data, isLoading } = useSpotify({
        api: ['browse', 'getCategories'],
        queryKey: [undefined, undefined, 8],
    });

    if (isLoading) {
        return Array.from({ length: 8 }, (_, index) => (
            <CategoryPlaylistsSkeleton key={index} showTopItems />
        ));
    }
    if (!data) return <div></div>;

    return (
        <>
            {data.categories.items.map((category, index) => (
                <CategoryTopPlaylists
                    key={index + category.id}
                    categoryId={category.id}
                ></CategoryTopPlaylists>
            ))}
        </>
    );
};

export const Component = PageHome;
