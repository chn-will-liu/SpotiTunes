import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { usePlayerStore } from './playerStore';
import { PlaybackTrackWindow, PlayerActions, RepeatMode } from './playerStore.types';
import './WebPlaybackSdk.types';
import { PlaybackState, PlayerClass } from './WebPlaybackSdk.types';
import { AbstractPlayer } from './WebPlayer';

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady(): void;
        Spotify: { Player: PlayerClass };
    }
}

export class WebPlaybackPlayer implements AbstractPlayer {
    private player!: InstanceType<PlayerClass>;
    private playerStatePolling!: ReturnType<Window['setTimeout']>;

    private deviceId!: string;
    private playerStore: PlayerActions = usePlayerStore.getState();

    constructor(private api: SpotifyApi) {}

    public async initialize(): Promise<void> {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.async = true;
            document.head.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                this.onWebPlaybackSDKReady(resolve);
            };
        });
    }

    public setVolume(newVolume: number): void {
        const { volume } = usePlayerStore.getState();
        if (newVolume !== volume) {
            this.player.setVolume(newVolume);
            this.playerStore.setVolume(newVolume);
        }
    }

    public pause(): void {
        this.player.pause();
    }

    public resume(): void {
        // somehow the player.resume() method doesn't work
        this.api.player.startResumePlayback(this.deviceId);
    }

    public togglePlay(): void {
        const { paused } = usePlayerStore.getState();
        if (paused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    public setRepeatMode(mode: RepeatMode): void {
        const repeatMode =
            mode === RepeatMode.None ? 'off' : mode === RepeatMode.Context ? 'context' : 'track';
        this.api.player.setRepeatMode(repeatMode, this.deviceId);
    }

    public toggleShuffle(isShuffled?: boolean): void {
        this.api.player.togglePlaybackShuffle(!!isShuffled, this.deviceId);
    }

    public seek(position: number): void {
        const { totalDuration } = usePlayerStore.getState();
        this.player.seek(totalDuration * position * 1000);
        this.playerStore.setPosition(position);
    }

    public skipToNext(): void {
        this.player.nextTrack();
    }

    public skipToPrevious(): void {
        this.player.previousTrack();
    }

    public setPlaybackTracks(trackWindow: PlaybackTrackWindow): void {
        const { contextUri, currentTrack, nextTracks, previousTracks } = trackWindow;
        const useOffset = !!contextUri?.match(/^spotify:(album|playlist|artist)/);
        const offset = useOffset ? { uri: currentTrack?.uri } : { position: previousTracks.length };
        const tracks = useOffset
            ? undefined
            : [...previousTracks, currentTrack!, ...nextTracks].map((track) => track.uri);
        this.api.player.startResumePlayback(
            this.deviceId,
            trackWindow.contextUri ?? undefined,
            tracks,
            offset
        );
    }

    private onWebPlaybackSDKReady(ready: () => void) {
        const player = new window.Spotify.Player({
            name: 'SpotiTunes',
            getOAuthToken: (cb) => {
                this.api.getAccessToken().then((token) => {
                    if (token) {
                        cb(token.access_token);
                    }
                });
            },
            volume: usePlayerStore.getState().volume,
        });

        player.addListener('ready', ({ device_id }) => {
            this.deviceId = device_id;
            ready();
        });
        player.addListener('player_state_changed', (state) => this.onPlayerStateChanged(state));
        player.connect();
        this.player = player;
    }

    private onPlayerStateChanged(state: PlaybackState) {
        const storeState = usePlayerStore.getState();

        const duration = Math.floor(state.duration / 1000);
        if (duration !== storeState.totalDuration) {
            this.playerStore.setTotalDuration(duration);
        }

        const position = state.position / state.duration;
        if (position !== storeState.position) {
            this.playerStore.setPosition(Number.isNaN(position) ? 0 : position);
        }

        if (state.paused !== storeState.paused) {
            this.playerStore.setPaused(state.paused);
        }

        if (state.repeat_mode !== storeState.repeatMode) {
            this.playerStore.setRepeatMode(state.repeat_mode);
        }

        if (state.shuffle !== storeState.isShuffled) {
            this.playerStore.toggleShuffled(state.shuffle);
        }

        if (state.track_window.current_track.uri !== storeState.trackWindow.currentTrack?.uri) {
            this.playerStore.setTrackWindow({
                currentTrack: state.track_window.current_track,
                nextTracks: state.track_window.next_tracks,
                previousTracks: state.track_window.previous_tracks,
                contextUri: state.context.uri,
            });
        }

        if (!state.paused) {
            this.startPositionAndVolumePolling();
        } else {
            clearTimeout(this.playerStatePolling);
        }
    }

    private startPositionAndVolumePolling() {
        this.playerStatePolling = setTimeout(() => {
            this.player.getVolume().then((playerVolume) => {
                const { volume } = usePlayerStore.getState();
                if (playerVolume !== volume) {
                    this.playerStore.setVolume(playerVolume);
                }
            });

            this.player
                .getCurrentState()
                .then((state) => state && this.onPlayerStateChanged(state));
        }, 250);
    }
}
