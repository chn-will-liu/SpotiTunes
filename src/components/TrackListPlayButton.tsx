import { Track } from '@spotify/web-api-ts-sdk';
import { FaPause, FaPlay } from 'react-icons/fa';
import { usePlayer, usePlayerState } from '../hooks/usePlayer';
import { usePlayTrackListCallback } from '../hooks/usePlayTrackListCallback';
import { TrackListType } from '../Spotify/WebPlayer/types';

export type TrackListPlayButtonProps = TrackListType & {
    tracks: Track[];
};

export const TrackListPlayButton = ({ tracks, ...type }: TrackListPlayButtonProps) => {
    const trackListType = usePlayerState((state) => state.trackWindow.trackListType);
    const isPaused = usePlayerState((state) => state.paused);
    const isCurrentTrackListInPlayer = isTrackListTypeEqual(trackListType, type);
    const isPlaying = isCurrentTrackListInPlayer && !isPaused;
    const player = usePlayer();
    const playTrackList = usePlayTrackListCallback(tracks, type);

    const onButtonClick = () => {
        if (isCurrentTrackListInPlayer) {
            player.togglePlay();
        } else {
            playTrackList(0);
        }
    };

    return (
        <button
            className="flex size-12 transform items-center justify-center rounded-full
            bg-spotiGreen shadow-md hover:scale-105 active:scale-100 active:opacity-75"
            onClick={onButtonClick}
        >
            {isPlaying ? (
                <FaPause className="size-4 text-black" />
            ) : (
                <FaPlay className="ml-1 size-4 text-black" />
            )}
        </button>
    );
};

const isTrackListTypeEqual = (a: TrackListType | null, b: TrackListType | null) => {
    return a?.type === b?.type && a?.entityId === b?.entityId;
};
