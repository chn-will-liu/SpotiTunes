import { Track } from '@spotify/web-api-ts-sdk';
import { usePlayer, usePlayerState } from '../hooks/usePlayer';
import { usePlayTrackListCallback } from '../hooks/usePlayTrackListCallback';
import { TrackListType } from '../Spotify/WebPlayer/types';
import { SpotiGreenButton } from './SpotiGreenButton';

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

    return <SpotiGreenButton type={isPlaying ? 'pause' : 'play'} onButtonClick={onButtonClick} />;
};

const isTrackListTypeEqual = (a: TrackListType | null, b: TrackListType | null) => {
    return a?.type === b?.type && a?.entityId === b?.entityId;
};
