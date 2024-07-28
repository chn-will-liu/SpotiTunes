import { Artist } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { SpotiGreenButton } from '../SpotiGreenButton';
import { SpotiImage } from '../SpotiImage';

export const ArtistCard = ({ artist }: { artist: Artist }) => {
    return (
        <Link
            key={artist.id}
            title={artist.name}
            to={'/artist/' + artist.id}
            className="group rounded-md p-3 hover:bg-black hover:bg-opacity-45"
        >
            <div className="relative">
                <SpotiImage
                    images={artist.images}
                    alt={artist.name}
                    size={180}
                    rounded="full"
                    displaySize="full"
                    className="mb-2"
                />
                <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpotiGreenButton type="play" />
                </div>
            </div>
            <div className="line-clamp-1" title={artist.name}>
                {artist.name}
            </div>
            <div className="text-sm text-white text-opacity-65">artist</div>
        </Link>
    );
};

export const ArtistCardSkeleton = () => {
    return (
        <div className="p-3">
            <SkeletonItem className="mb-2 aspect-square rounded-full" />
            <SkeletonItem className="mb-1 h-6 rounded-sm" />
            <SkeletonItem className="h-4 rounded-sm" />
        </div>
    );
};
