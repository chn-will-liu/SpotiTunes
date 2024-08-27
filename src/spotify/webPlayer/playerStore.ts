import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
    PersistablePlayerState,
    PlaybackTrackWindow,
    PlayerActions,
    PlayerState,
    RepeatMode,
} from './playerStore.types';

export const createPlayerStore = (initialState: Partial<PersistablePlayerState>) => {
    return create<PlayerState & PlayerActions>()(
        subscribeWithSelector((set) => ({
            volume: initialState.volume ?? 0.5,
            paused: true,
            position: 0,
            totalDuration: 0,
            currentTime: 0,
            repeatMode: initialState.repeatMode ?? RepeatMode.Context,
            isShuffled: initialState.isShuffled ?? false,
            trackWindow: initialState.trackWindow ?? {
                contextUri: null,
                currentTrack: null,
                previousTracks: [],
                nextTracks: [],
            },
            setVolume: (volume: number) => set((state) => ({ ...state, volume })),
            setPaused: (paused: boolean) => set((state) => ({ ...state, paused })),
            setPosition: (position: number) => set((state) => ({ ...state, position })),
            setTotalDuration: (totalDuration: number) =>
                set((state) => ({ ...state, totalDuration })),
            setCurrentTime: (currentTime: number) => set((state) => ({ ...state, currentTime })),
            setRepeatMode: (repeatMode: RepeatMode) => set((state) => ({ ...state, repeatMode })),
            toggleShuffled: (isShuffled?: boolean) =>
                set((state) => ({ ...state, isShuffled: isShuffled ?? !state.isShuffled })),
            setTrackWindow: (trackWindow: PlaybackTrackWindow) =>
                set((state) => ({ ...state, trackWindow })),
            skipToNext: () =>
                set((state) => ({
                    ...state,
                    trackWindow: {
                        contextUri: state.trackWindow.contextUri,
                        currentTrack: state.trackWindow.nextTracks[0],
                        previousTracks: [
                            ...state.trackWindow.previousTracks,
                            state.trackWindow.currentTrack!,
                        ].filter((item) => item != null),
                        nextTracks: state.trackWindow.nextTracks.slice(1),
                    },
                })),
            skipToPrevious: () =>
                set((state) => ({
                    ...state,
                    trackWindow: {
                        contextUri: state.trackWindow.contextUri,
                        currentTrack:
                            state.trackWindow.previousTracks[
                                state.trackWindow.previousTracks.length - 1
                            ],
                        previousTracks: state.trackWindow.previousTracks.slice(0, -1),
                        nextTracks: [
                            state.trackWindow.currentTrack!,
                            ...state.trackWindow.nextTracks,
                        ].filter((item) => item != null),
                    },
                })),
        }))
    );
};
