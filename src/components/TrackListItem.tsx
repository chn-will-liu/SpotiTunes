import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { PiHeart, PiHeartFill, PiPauseFill, PiPlayFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useFormatter } from '../hooks/useFormatter';
import { useIsTrackLiked } from '../hooks/useIsTrackLiked';
import { usePlayerState } from '../hooks/usePlayer';
import { ArtistLinkList } from './artist/ArtistLinkList';
import { IconButton } from './IconButton';
import { SkeletonItem } from './skeletons/SkeletonItem';
import { SpotiImage } from './SpotiImage';

export type TrackListItemProps = {
    track: SimplifiedTrack;
    album: SimplifiedAlbum;
    showAlbum?: boolean;
    showAlbumName?: boolean;
    index?: number;
    showIndex?: boolean;
    isInPlayer?: boolean;
    compactMode?: boolean;
    onPlayButtonClick?: (index: number) => void;
};

export const TrackListItem = ({
    track,
    album,
    index,
    showIndex,
    showAlbum,
    showAlbumName,
    compactMode,
    isInPlayer,
    onPlayButtonClick,
}: TrackListItemProps) => {
    const formatter = useFormatter();
    const duration = useMemo(
        () => formatter.formatDurationMs(track.duration_ms),
        [track, formatter]
    );
    const isTrackLiked = useIsTrackLiked(track.id);
    const isPlayerPaused = usePlayerState((state) => state.paused);

    return (
        <div
            className={`group flex items-center whitespace-nowrap  ${compactMode ? 'compact-mode gap-4 p-2' : 'gap-8 border-b border-white border-opacity-25 py-5 pl-5 pr-10'}
            from-transparent to-[#ffffff22] hover:bg-gradient-to-r `}
        >
            {showIndex && (
                <div className="w-5">
                    <span className={`group-hover:hidden ${isInPlayer ? 'text-spotiGreen' : ''}`}>
                        #{index! + 1}
                    </span>
                    <IconButton
                        icon={!isPlayerPaused && isInPlayer ? PiPauseFill : PiPlayFill}
                        hoverEffect="opacity"
                        size="sm"
                        className="hidden group-hover:block"
                        onClick={() => onPlayButtonClick?.(index!)}
                    />
                </div>
            )}
            {showAlbum && (
                <SpotiImage images={album.images} alt={album.name} size={compactMode ? 42 : 56} />
            )}
            <div className="shrink-1 flex-1 flex-grow-[3] overflow-hidden whitespace-nowrap mask-gradient text-shadow-md">
                <Link
                    to={`/track/${track.id}`}
                    className={`group/link ${isInPlayer ? 'text-spotiGreen' : ''}`}
                >
                    {track.preview_url && (
                        <BsSoundwave className="mr-1 inline-block align-middle" />
                    )}
                    <span className="inline-block align-middle group-hover/link:underline">
                        {track.name}
                    </span>
                </Link>
                <div className="line-clamp-1">
                    <ArtistLinkList
                        artists={track.artists}
                        className="group-hover:text-opacity-100"
                    />
                </div>
            </div>
            {showAlbumName && (
                <Link
                    to={`/album/${album.id}`}
                    className="flex-1 flex-grow-[2] overflow-hidden whitespace-nowrap text-sm mask-gradient hover:underline"
                >
                    {album.name}
                </Link>
            )}
            <div>
                <IoMdTime className="mr-2 inline-block size-6 align-middle text-white text-opacity-65" />
                <span className="inline-block align-middle">{duration}</span>
            </div>
            {isTrackLiked && (
                <IconButton
                    icon={PiHeartFill}
                    hoverEffect="opacity"
                    size="md"
                    className="text-spotiGreen"
                />
            )}
            {!isTrackLiked && <IconButton icon={PiHeart} hoverEffect="opacity" size="md" />}
            <IconButton icon={MdMoreHoriz} hoverEffect="opacity" size="md" />
        </div>
    );
};

export const TrackListItemSkeleton = ({ showAlbum }: { showAlbum?: boolean }) => {
    return (
        <div className="flex items-center gap-8 py-5 pl-5 pr-10">
            <div className="w-5">
                <SkeletonItem className="h-6 w-6" />
            </div>
            {showAlbum && <SkeletonItem className="size-[56px] rounded-md" />}
            <div className="shrink-1 flex-1 flex-grow-[3]">
                <SkeletonItem className="my-1 h-6 w-2/3" />
                <SkeletonItem className="h-4 w-4/5" />
            </div>
            <div className="flex-1 flex-grow-[2]">
                <SkeletonItem className="h-6 w-2/3" />
            </div>
            <SkeletonItem className="h-6 w-10" />
            <SkeletonItem className="h-6 w-10" />
            <SkeletonItem className="h-6 w-10" />
        </div>
    );
};
