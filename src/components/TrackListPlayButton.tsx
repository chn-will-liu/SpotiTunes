import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import React from 'react';
import { usePlayerState } from '../hooks/usePlayer';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { PlaybackTrackListType } from '../spotify/webPlayer/types';
import { SpotiGreenButton } from './SpotiGreenButton';

export type TrackListPlayButtonProps = PlaybackTrackListType & {
    tracks: SimplifiedTrack[];
    album: SimplifiedAlbum;
};

export const TrackListPlayButton = React.memo((trackList: TrackListModel) => {
    const isPaused = usePlayerState((state) => state.paused);

    const { toggleTrackListPlay, isTrackListInPlayer } = useTrackListPlay(trackList);
    const isPlaying = isTrackListInPlayer && !isPaused;

    return (
        <SpotiGreenButton
            type={isPlaying ? 'pause' : 'play'}
            onButtonClick={() => toggleTrackListPlay()}
        />
    );
});
