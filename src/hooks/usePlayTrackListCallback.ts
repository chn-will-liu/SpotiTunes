import { Track } from '@spotify/web-api-ts-sdk';
import { useCallback, useRef } from 'react';
import { usePlayer } from '../Spotify/usePlayer';
import { mapTrackToPlaybackTrack } from '../Spotify/WebPlayer/mappers';
import { PlaybackTrackWindow, TrackListType } from '../Spotify/WebPlayer/types';

export const usePlayTrackListCallback = (
    tracks: Track[] | undefined,
    trackListType: TrackListType
) => {
    const player = usePlayer();
    const trackListTypeRef = useRef(trackListType);
    trackListTypeRef.current = trackListType;
    const tracksRef = useRef(tracks);
    tracksRef.current = tracks;

    return useCallback(
        (index: number) => {
            if (!tracksRef.current) return;
            const playbackTracks = tracksRef.current.map((track) => mapTrackToPlaybackTrack(track));
            const trackWindow: PlaybackTrackWindow = {
                trackListType: trackListTypeRef.current,
                currentTrack: playbackTracks[index],
                previousTracks: playbackTracks.slice(0, index),
                nextTracks: playbackTracks.slice(index + 1),
            };
            player.setPlaybackTracks(trackWindow);
            player.resume();
        },
        [tracksRef, trackListTypeRef, player]
    );
};
