import { Link } from 'react-router-dom';
import { PageTextHeader } from '../../components/PageTextHeader';
import { useSpotify } from '../../hooks/useSpotify';

export const PageDiscover = () => {
    const { data: categories, isLoading } = useSpotify({
        api: ['browse', 'getCategories'],
        queryKey: [],
    });

    if (isLoading) return <div>is loading...</div>;
    if (!categories) return <div>No categories</div>;

    return (
        <>
            <PageTextHeader className="px-5">Discover</PageTextHeader>
            <div className="grid gap-5 p-5 auto-fill-[160px]">
                {categories.categories.items.map((category) => (
                    <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="transform text-center opacity-85 transition-all duration-150 hover:scale-105 hover:opacity-100"
                    >
                        <img src={category.icons[0].url} alt={category.name} className="w-full" />
                        <span>{category.name}</span>
                    </Link>
                ))}
            </div>
        </>
    );
};

export const Component = PageDiscover;
