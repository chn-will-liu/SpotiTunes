import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { PiHeart, PiHeartFill, PiPlayFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useIsTrackLiked } from '../hooks/useIsTrackLiked';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { formatDurationMs } from '../utils';
import { ArtistLinkList } from './ArtistLinkList';
import { IconButton } from './IconButton';
import { SpotiImage } from './SpotiImage';

export const TrackList = (trackList: TrackListModel) => {
    const onPlayButtonClick = useTrackListPlay(trackList);

    return (
        <div>
            {trackList.tracks.map((track, index) => (
                <TrackListItem
                    key={track.id}
                    index={index}
                    track={track}
                    album={track.album}
                    showAlbum={trackList.type !== 'album'}
                    onPlayButtonClick={onPlayButtonClick}
                />
            ))}
        </div>
    );
};

type TrackListItemProps = {
    showAlbum: boolean;
    track: SimplifiedTrack;
    album: SimplifiedAlbum;
    index: number;
    onPlayButtonClick?: (index: number) => void;
};

const TrackListItem = ({
    track,
    album,
    index,
    showAlbum,
    onPlayButtonClick,
}: TrackListItemProps) => {
    const duration = useMemo(() => formatDurationMs(track.duration_ms), [track]);
    const isTrackLiked = useIsTrackLiked(track.id);

    return (
        <div
            className="group ml-8 flex items-center gap-8 whitespace-nowrap 
            border-b border-white border-opacity-25 from-transparent to-[#ffffff22] py-5 pl-5 pr-10 hover:bg-gradient-to-r"
        >
            <div className="w-5">
                <span className="group-hover:hidden">#{index + 1}</span>
                <IconButton
                    icon={PiPlayFill}
                    hoverEffect="opacity"
                    size="sm"
                    className="hidden group-hover:block"
                    onClick={() => onPlayButtonClick?.(index)}
                />
            </div>
            {showAlbum && <SpotiImage images={album.images} alt={album.name} size={56} />}
            <div className="shrink-1 flex-1 flex-grow-[3] overflow-hidden whitespace-nowrap mask-gradient text-shadow-md">
                <Link to={`/track/${track.id}`} className="group/link">
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
            {showAlbum && (
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
