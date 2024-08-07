import { useCallback, useRef } from 'react';
import { mapTrackListToPlaybackTracks } from '../models/mappings';
import { TrackListModel } from '../models/TrackListModel';
import { PlaybackTrackListType, PlaybackTrackWindow } from '../spotify/webPlayer/types';
import { usePlayer, usePlayerState } from './usePlayer';

export const useTrackListPlay = (trackList: TrackListModel) => {
    const player = usePlayer();
    const trackListRef = useRef(trackList);
    trackListRef.current = trackList;

    const currentTrackListType = usePlayerState((state) => state.trackWindow.trackListType);
    const isTrackListInPlayer = isTrackListTypeEqual(currentTrackListType, trackList);

    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);

    const toggleTrackListPlay = useCallback(
        (index?: number) => {
            if (!trackListRef.current) return;

            if (isTrackListInPlayer) {
                if (index == null || currentTrack?.id === trackListRef.current.tracks[index]?.id) {
                    player.togglePlay();
                    return;
                }
            }

            const playbackTracks = mapTrackListToPlaybackTracks(trackListRef.current);
            const trackWindow: PlaybackTrackWindow = {
                trackListType: {
                    type: trackListRef.current.type,
                    entityId:
                        trackListRef.current.type === 'savedTracks'
                            ? undefined
                            : trackListRef.current.entityId,
                },
                currentTrack: playbackTracks[index ?? 0],
                previousTracks: playbackTracks.slice(0, index ?? 0),
                nextTracks: playbackTracks.slice((index ?? 0) + 1),
            };
            player.setPlaybackTracks(trackWindow);
            player.resume();
        },
        [isTrackListInPlayer, player, currentTrack]
    );

    return {
        toggleTrackListPlay,
        isTrackListInPlayer,
    };
};

const isTrackListTypeEqual = (a: PlaybackTrackListType | null, b: TrackListModel | null) => {
    if (a?.type !== b?.type) {
        return false;
    }

    if (b?.type === 'savedTracks') {
        return true;
    }

    return a?.entityId === b?.entityId;
};
