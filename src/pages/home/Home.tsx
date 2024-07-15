import { useSpotify } from '../../hooks/useSpotify';
import { CategoryTopPlaylists } from '../category/Category';
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
        queryKey: [undefined, undefined, 6],
    });

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

export const Component = PageHome;
