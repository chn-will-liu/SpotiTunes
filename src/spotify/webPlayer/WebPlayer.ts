import { createPlayerStore } from './playerStore';
import {
    PersistablePlayerState,
    PlaybackTrackWindow,
    PlayerActions,
    RepeatMode,
} from './playerStore.types';

export abstract class WebPlayer {
    protected playerActions: PlayerActions;
    protected playerStore: ReturnType<typeof createPlayerStore>;

    public abstract setVolume(volume: number): void;
    public abstract pause(): void;
    public abstract resume(): void;
    public abstract togglePlay(): void;
    public abstract setRepeatMode(mode: RepeatMode): void;
    public abstract toggleShuffle(isShuffled?: boolean): void;
    public abstract seek(position: number): void;
    public abstract skipToNext(): void;
    public abstract skipToPrevious(): void;
    public abstract setPlaybackTracks(trackWindow: PlaybackTrackWindow): void;

    constructor() {
        let persistedState: Partial<PersistablePlayerState>;
        try {
            persistedState = JSON.parse(window.localStorage.getItem('playerState') || '{}');
        } catch {
            persistedState = {};
        }

        this.playerStore = createPlayerStore(persistedState);
        this.playerActions = this.playerStore.getState();

        this.playerStore.subscribe(
            (state): PersistablePlayerState => ({
                volume: state.volume,
                trackWindow: state.trackWindow,
                isShuffled: state.isShuffled,
                repeatMode: state.repeatMode,
            }),
            (state) => {
                window.localStorage.setItem('playerState', JSON.stringify(state));
            },
            {
                equalityFn: (a, b) =>
                    a.volume === b.volume &&
                    a.trackWindow === b.trackWindow &&
                    a.isShuffled === b.isShuffled &&
                    a.repeatMode === b.repeatMode,
            }
        );
    }

    public get usePlayerStore() {
        return this.playerStore;
    }
}
