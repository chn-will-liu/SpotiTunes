import { Artist } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { PageTextHeader, PageTextHeaderSkeleton } from '../PageTextHeader';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { ArtistCard, ArtistCardSkeleton } from './ArtistCard';

export type ArtistListSectionProps = {
    artists: Artist[];
    title: string;
    displayMode: 'all' | 'top-items';
    link: string;
};

export const ArtistListSection = ({
    artists,
    displayMode,
    title,
    link,
}: ArtistListSectionProps) => {
    if (artists.length === 0) return null;

    const items = (
        <div className="grid px-2 py-2 auto-fill-[220px]">
            {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );

    return displayMode === 'top-items' ? (
        <section className="py-5">
            <h1 className="flex justify-between px-5 font-normal">
                <Link to={link} className="text-2xl hover:underline">
                    {title}
                </Link>
                <Link
                    to={link}
                    className="text-sm text-white text-opacity-65 hover:text-opacity-100 hover:underline"
                >
                    Show all
                </Link>
            </h1>
            {items}
        </section>
    ) : (
        <>
            <PageTextHeader>{title}</PageTextHeader>
            {items}
        </>
    );
};

export const ArtistListSectionSkeleton = ({
    displayMode,
}: {
    displayMode: 'all' | 'top-items';
}) => {
    const artistList = Array.from({ length: displayMode === 'all' ? 12 : 6 }, (_, index) => (
        <ArtistCardSkeleton key={index} />
    ));

    const items = <div className="grid px-2 py-2 auto-fill-[220px]">{artistList}</div>;

    return displayMode === 'top-items' ? (
        <section className="py-5">
            <div className="px-5">
                <SkeletonItem className="h-8 w-1/3" />
            </div>
            {items}
        </section>
    ) : (
        <>
            <PageTextHeaderSkeleton />
            {items}
        </>
    );
};
