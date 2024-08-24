import React from 'react';
import { usePlayerState } from '../hooks/usePlayer';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { SpotiGreenButton } from './SpotiGreenButton';

export const TrackListPlayButton = React.memo((trackList: TrackListModel) => {
    const isPaused = usePlayerState((state) => state.paused);

    const { toggleTrackListPlay, isTrackListInPlayer } = useTrackListPlay(trackList);
    const isPlaying = isTrackListInPlayer && !isPaused;

    return (
        <SpotiGreenButton type={isPlaying ? 'pause' : 'play'} onButtonClick={toggleTrackListPlay} />
    );
});
