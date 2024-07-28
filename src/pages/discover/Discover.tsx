import { Link } from 'react-router-dom';
import { PageTextHeader, PageTextHeaderSkeleton } from '../../components/PageTextHeader';
import { SkeletonItem } from '../../components/skeletons/SkeletonItem';
import { useSpotify } from '../../hooks/useSpotify';

export const PageDiscover = () => {
    const { data: categories, isLoading } = useSpotify({
        api: ['browse', 'getCategories'],
        queryKey: [],
    });

    if (isLoading) {
        return <PageDiscoverSkeleton />;
    }
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

const PageDiscoverSkeleton = () => {
    return (
        <>
            <PageTextHeaderSkeleton />
            <div className="grid gap-5 p-5 auto-fill-[160px]">
                {Array.from({ length: 20 }, (_, index) => (
                    <div key={index}>
                        <SkeletonItem className="aspect-square" />
                        <SkeletonItem className="mt-1 h-5" />
                    </div>
                ))}
            </div>
        </>
    );
};

export const Component = PageDiscover;
