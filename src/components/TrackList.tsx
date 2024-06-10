import { Track } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { IoMdTime } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { usePlayTrackListCallback } from '../hooks/usePlayTrackListCallback';
import { TrackListType } from '../Spotify/WebPlayer/types';
import { formatDurationMs } from '../utils';
import { AlbumImage } from './AlbumImage';
import { ArtistLinkList } from './ArtistLinkList';
import { IconButton } from './IconButton';

export type TrackListProps = TrackListType & {
    tracks: Track[];
};

export const TrackList = ({ tracks, ...type }: TrackListProps) => {
    const onPlayButtonClick = usePlayTrackListCallback(tracks, type);
    return (
        <div>
            {tracks.map((track, index) => (
                <TrackListItem
                    key={track.id}
                    index={index}
                    track={track}
                    onPlayButtonClick={onPlayButtonClick}
                />
            ))}
        </div>
    );
};

type TrackListItemProps = {
    track: Track;
    index: number;
    onPlayButtonClick?: (index: number) => void;
};

const TrackListItem = ({ track, index, onPlayButtonClick }: TrackListItemProps) => {
    const duration = useMemo(() => formatDurationMs(track.duration_ms), [track]);

    return (
        <div
            className="group ml-8 flex items-center gap-8 whitespace-nowrap 
            border-b border-white border-opacity-25 from-transparent to-[#ffffff22] py-5 pl-5 pr-10 hover:bg-gradient-to-r"
        >
            <div className="w-5">
                <span className="group-hover:hidden">#{index + 1}</span>
                <IconButton
                    icon={FaPlay}
                    hoverEffect="opacity"
                    size="sm"
                    className="hidden group-hover:block"
                    onClick={() => onPlayButtonClick?.(index)}
                />
            </div>
            <AlbumImage images={track.album.images} alt={track.album.name} size={56} />
            <div className="mask-gradient text-shadow-md flex-1 flex-grow-[3] overflow-hidden whitespace-nowrap">
                <Link to={`/track/${track.id}`} className="group/link">
                    {track.preview_url && (
                        <BsSoundwave className="mr-1 inline-block align-middle" />
                    )}
                    <span className="inline-block align-middle group-hover/link:underline">
                        {track.name}
                    </span>
                </Link>
                <div className="">
                    <ArtistLinkList
                        artists={track.artists}
                        className="group-hover:text-opacity-100"
                    />
                </div>
            </div>
            <span className="mask-gradient flex-1 flex-grow-[2] overflow-hidden whitespace-nowrap text-sm">
                {track.album.name}
            </span>
            <div>
                <IoMdTime className="mr-2 inline-block size-6 align-middle text-white text-opacity-65" />
                <span className="inline-block align-middle">{duration}</span>
            </div>
            <IconButton icon={GrFavorite} hoverEffect="opacity" size="lg" />
            <IconButton icon={MdMoreHoriz} hoverEffect="opacity" size="lg" />
        </div>
    );
};
