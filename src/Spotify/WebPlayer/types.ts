import { Image } from '@spotify/web-api-ts-sdk';

export interface PlaybackTrack {
    uri: string;
    id: string;
    resouceUrl: string | null;
    type: string;
    name: string;
    album: {
        uri: string;
        name: string;
        images: Image[];
    };
    artists: {
        id: string;
        name: string;
    }[];
}

export enum RepeatMode {
    None = 0,
    Context = 1,
    Track = 2,
}

// export interface Disallows {
//     pausing: boolean;
//     skippingPrev: boolean;
//     skippingNext: boolean;
//     togglingRepeatContext: boolean;
//     togglingShuffle: boolean;
// }

export interface PlayerState extends PersistablePlayerState {
    // disallows: Disallows;
    paused: boolean;
    /**
     * A float value between 0 and 1 representing the position within the track.
     */
    position: number;
    /**
     * The total duration of the track in seconds.
     */
    totalDuration: number;
}

export interface PersistablePlayerState {
    repeatMode: RepeatMode;
    isShuffled: boolean;
    trackWindow: PlaybackTrackWindow;
    volume: number;
}

export interface PlayerActions {
    setVolume: (volume: number) => void;
    setPaused: (paused: boolean) => void;
    setPosition: (position: number) => void;
    setTotalDuration: (totalDuration: number) => void;
    setRepeatMode: (repeatMode: RepeatMode) => void;
    toggleShuffled: (isShuffled?: boolean) => void;
    setTrackWindow: (trackWindow: PlaybackTrackWindow) => void;
    skipToNext: () => void;
    skipToPrevious: () => void;
}

// export interface WebPlayerEvents {
//     playerStateChanged: ((state: PlayerCurrentState) => void)[];
// }

export type TrackListType = {
    type: 'savedTracks' | 'playlist' | 'album' | 'artistPopularTracks';
    entityId?: string | undefined;
};

export interface PlaybackTrackWindow {
    trackListType: TrackListType | null;
    currentTrack: PlaybackTrack | null;
    previousTracks: PlaybackTrack[];
    nextTracks: PlaybackTrack[];
}
