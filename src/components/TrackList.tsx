import { Page, SavedTrack, Track } from '@spotify/web-api-ts-sdk';
import { useCallback, useMemo } from 'react';
import { FaPlay } from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { IoMdTime } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { usePlayer } from '../Spotify/usePlayer';
import { mapTrackToPlaybackTrack } from '../Spotify/WebPlayer/mappers';
import { PlaybackTrackWindow } from '../Spotify/WebPlayer/WebPlayer';
import { formatDurationMs } from '../utils';
import { AlbumImage } from './AlbumImage';
import { IconButton } from './IconButton';

export type TrackListProps = {
    type: 'savedTracks';
    tracks: Page<SavedTrack>;
};

export const TrackList = ({ tracks }: TrackListProps) => {
    const player = usePlayer();
    const onPlayButtonClick = useCallback(
        (index: number) => {
            const playbackTracks = tracks.items.map((track) =>
                mapTrackToPlaybackTrack(track.track)
            );
            const trackWindow: PlaybackTrackWindow = {
                currentTrack: playbackTracks[index],
                previousTracks: playbackTracks.slice(0, index),
                nextTracks: playbackTracks.slice(index + 1),
            };
            player.setPlaybackTracks(trackWindow);
            player.resume();
        },
        [tracks, player]
    );
    return (
        <div>
            {tracks.items.map((track, index) => (
                <TrackListItem
                    key={track.track.id}
                    index={index}
                    track={track.track}
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
            <div className="mask-gradient flex-1 flex-grow-[3] overflow-hidden whitespace-nowrap ">
                <div>{track.name}</div>
                <span className="text-sm text-white opacity-65">
                    {track.artists.map((a) => a.name).join(', ')}
                </span>
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
