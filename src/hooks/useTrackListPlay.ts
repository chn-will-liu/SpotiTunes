import { useCallback } from 'react';
import { mapTrackListToPlaybackTracks } from '../models/mappings';
import { TrackListModel } from '../models/TrackListModel';
import { PlaybackTrackWindow } from '../spotify/webPlayer/playerStore.types';
import { usePlayer, usePlayerState } from './usePlayer';

export const useTrackListPlay = ({ contextUri, tracks }: TrackListModel) => {
    const player = usePlayer();
    const currentContextUri = usePlayerState((state) => state.trackWindow.contextUri);
    const isTrackListInPlayer = (currentContextUri ?? '') === (contextUri ?? '');
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);

    const toggleTrackListPlay = useCallback(
        (index?: number) => {
            if (isTrackListInPlayer) {
                if (index == null || currentTrack?.id === tracks[index]?.id) {
                    player.togglePlay();
                    return;
                }
            }

            const playbackTracks = mapTrackListToPlaybackTracks(tracks);
            const trackWindow: PlaybackTrackWindow = {
                contextUri: contextUri ?? null,
                currentTrack: playbackTracks[index ?? 0],
                previousTracks: playbackTracks.slice(0, index ?? 0),
                nextTracks: playbackTracks.slice((index ?? 0) + 1),
            };
            player.setPlaybackTracks(trackWindow);
        },
        [isTrackListInPlayer, player, currentTrack, contextUri, tracks]
    );

    return {
        toggleTrackListPlay,
        isTrackListInPlayer,
    };
};
