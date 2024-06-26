import EMPTY_AUDIO_URL from './../../assets/10-seconds-of-silence.mp3';
import { usePlayerStore } from './playerStore';
import { PersistablePlayerState, PlaybackTrackWindow, PlayerActions, RepeatMode } from './types';

export class WebPlayer {
    private audioEl = document.createElement('audio');
    private playerActions: PlayerActions = usePlayerStore.getState();

    constructor() {
        document.body.appendChild(this.audioEl);
        this.audioEl.hidden = true;
        this.audioEl.addEventListener('loadedmetadata', () => {
            this.playerActions.setTotalDuration(this.audioEl.duration);
        });
        this.audioEl.addEventListener('timeupdate', () => {
            const position = this.audioEl.currentTime / this.audioEl.duration;
            this.playerActions.setPosition(Number.isNaN(position) ? 0 : position);
        });
        this.audioEl.addEventListener('pause', () => {
            this.playerActions.setPaused(true);
        });
        this.audioEl.addEventListener('play', () => {
            this.playerActions.setPaused(false);
        });
        this.audioEl.addEventListener('ended', () => this.handleTrackEnd());

        usePlayerStore.subscribe(
            (state) => state.trackWindow.currentTrack,
            (current, prev) => {
                if (prev?.uri === current?.uri) return;
                if (current) {
                    this.audioEl.src = current.resouceUrl ?? EMPTY_AUDIO_URL;
                }
                this.playerActions.setTotalDuration(0);
                this.seek(0);
            }
        );

        usePlayerStore.subscribe(
            (state): PersistablePlayerState => ({
                volume: state.volume,
                trackWindow: state.trackWindow,
                isShuffled: state.isShuffled,
                repeatMode: state.repeatMode,
            }),
            (state) => {
                window.localStorage.setItem('playerState', JSON.stringify(state));
            }
        );

        const persistedState: PersistablePlayerState = JSON.parse(
            window.localStorage.getItem('playerState') || '{}'
        );
        this.setVolume(persistedState.volume ?? 0.5);
        this.setRepeatMode(persistedState.repeatMode ?? RepeatMode.Context);
        this.toggleShuffle(persistedState.isShuffled ?? false);
        this.setPlaybackTracks(
            persistedState.trackWindow ?? { currentTrack: null, nextTracks: [], previousTracks: [] }
        );
    }

    public setVolume(volumn: number) {
        volumn = Math.max(0, Math.min(1, volumn));
        this.audioEl.volume = volumn;
        this.playerActions.setVolume(volumn);
    }

    public pause() {
        this.playerActions.setPaused(true);
        this.audioEl.pause();
    }

    public resume() {
        if (usePlayerStore.getState().trackWindow.currentTrack == null) return;
        this.audioEl.play();
        this.playerActions.setPaused(false);
    }

    public togglePlay() {
        if (usePlayerStore.getState().paused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    public setRepeatMode(mode: RepeatMode) {
        this.playerActions.setRepeatMode(mode);
    }

    public toggleShuffle(isShuffled?: boolean) {
        this.playerActions.toggleShuffled(isShuffled);
    }

    public seek(position: number) {
        this.playerActions.setPosition(position);
        if (this.audioEl.duration) {
            this.audioEl.currentTime = this.audioEl.duration * position;
        }
    }

    public skipToNext() {
        this.playerActions.skipToNext();
        const { currentTrack } = usePlayerStore.getState().trackWindow;
        if (currentTrack) {
            this.resume();
        }
    }

    public skipToPrevious() {
        this.playerActions.skipToPrevious();
        this.resume();
    }

    public setPlaybackTracks(trackWindow: PlaybackTrackWindow) {
        this.playerActions.setTrackWindow(trackWindow);
    }

    private handleTrackEnd() {
        const { repeatMode, trackWindow } = usePlayerStore.getState();

        if (repeatMode === RepeatMode.Track) {
            this.seek(0);
            this.resume();
            return;
        }

        if (trackWindow.nextTracks.length > 0) {
            this.skipToNext();
            return;
        }

        if (repeatMode === RepeatMode.Context) {
            this.setPlaybackTracks({
                ...trackWindow,
                currentTrack: trackWindow.previousTracks[0],
                previousTracks: [],
                nextTracks: trackWindow.previousTracks.slice(1),
            });
            this.seek(0);
            this.resume();
        }
    }
}
