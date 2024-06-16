import { useCallback, useRef } from 'react';
import { mapTrackListToPlaybackTracks } from '../models/mappings';
import { TrackListModel } from '../models/TrackListModel';
import { PlaybackTrackWindow } from '../Spotify/WebPlayer/types';
import { usePlayer } from './usePlayer';

export const useTrackListPlay = (trackList: TrackListModel) => {
    const player = usePlayer();
    const trackListRef = useRef(trackList);
    trackListRef.current = trackList;

    return useCallback(
        (index: number) => {
            if (!trackListRef.current) return;
            const playbackTracks = mapTrackListToPlaybackTracks(trackListRef.current);
            const trackWindow: PlaybackTrackWindow = {
                trackListType: {
                    type: trackListRef.current.type,
                    entityId:
                        trackListRef.current.type === 'savedTracks'
                            ? undefined
                            : trackListRef.current.entityId,
                },
                currentTrack: playbackTracks[index],
                previousTracks: playbackTracks.slice(0, index),
                nextTracks: playbackTracks.slice(index + 1),
            };
            player.setPlaybackTracks(trackWindow);
            player.resume();
        },
        [trackListRef, player]
    );
};
