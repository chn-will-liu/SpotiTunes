import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { SpotiGreenButton } from '../SpotiGreenButton';
import { SpotiImage } from '../SpotiImage';
import { TextWithHref } from '../TextWithHref';

export const PlaylistCardSkeleton = () => {
    return (
        <div className="p-3">
            <SkeletonItem className="mb-2 aspect-square rounded-md" />
            <SkeletonItem className="mb-1 h-6 rounded-sm" />
            <SkeletonItem className="h-8 rounded-sm" />
        </div>
    );
};

export const PlaylistCard = ({ playlist }: { playlist: SimplifiedPlaylist }) => {
    return (
        <Link
            to={'/playlist/' + playlist.id}
            title={playlist.name}
            className="group rounded-md p-3 hover:bg-black hover:bg-opacity-45"
        >
            <div className="relative">
                <SpotiImage
                    images={playlist.images}
                    alt={playlist.name}
                    size={180}
                    displaySize="full"
                    className="mb-2"
                />
                <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpotiGreenButton type="play" />
                </div>
            </div>
            <div className="line-clamp-1" title={playlist.name}>
                {playlist.name}
            </div>
            <div className="line-clamp-2 text-sm text-white text-opacity-65">
                <TextWithHref text={playlist.description} removeHref />
            </div>
        </Link>
    );
};
