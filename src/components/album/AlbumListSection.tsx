import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { PageTextHeader } from '../PageTextHeader';
import { AlbumCard } from './AlbumCard';

export type AlbumListSectionProps = {
    albums: SimplifiedAlbum[];
    title: string;
    displayMode: 'all' | 'top-items';
    link: string;
};

export const AlbumListSection = ({ albums, displayMode, title, link }: AlbumListSectionProps) => {
    if (albums.length === 0) return null;

    const items = (
        <div className="grid px-2 py-2 auto-fill-[220px]">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
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
