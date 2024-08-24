import EMPTY_AUDIO_URL from './../../assets/10-seconds-of-silence.mp3';
import { usePlayerStore } from './playerStore';
import { PlaybackTrackWindow, PlayerActions, RepeatMode } from './playerStore.types';
import { AbstractPlayer } from './WebPlayer';

export class PreviewPlaybackPlayer implements AbstractPlayer {
    private audioEl = document.createElement('audio');
    private playerActions: PlayerActions = usePlayerStore.getState();

    public async initialize(): Promise<void> {
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

        const { volume, trackWindow } = usePlayerStore.getState();
        this.audioEl.volume = volume;
        const currentTrack = trackWindow.currentTrack;
        if (currentTrack && currentTrack.resouceUrl !== this.audioEl.src) {
            this.audioEl.src = currentTrack.resouceUrl ?? EMPTY_AUDIO_URL;
        }

        usePlayerStore.subscribe(
            (state) => state.trackWindow.currentTrack,
            (current, prev) => {
                if (current?.resouceUrl !== this.audioEl.src) {
                    this.audioEl.src = current?.resouceUrl ?? EMPTY_AUDIO_URL;
                }
                if (prev?.uri === current?.uri) return;
                this.playerActions.setTotalDuration(0);
                this.seek(0);
            }
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
        this.resume();
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
