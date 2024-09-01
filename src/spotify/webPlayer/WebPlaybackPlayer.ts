import { SpotifyApi, TrackItem } from '@spotify/web-api-ts-sdk';
import { mapTrackToPlaybackTrack } from '../../models/mappings';
import { PlaybackTrackWindow, RepeatMode } from './playerStore.types';
import './WebPlaybackSdk.types';
import { PlaybackState, WebPlaybackPlayerClass } from './WebPlaybackSdk.types';
import { WebPlayer } from './WebPlayer';

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady(): void;
        Spotify: { Player: WebPlaybackPlayerClass };
    }
}

export class WebPlaybackPlayer extends WebPlayer {
    private player!: InstanceType<WebPlaybackPlayerClass>;
    private playerStatePolling!: ReturnType<Window['setTimeout']>;
    private deviceId!: string;

    // we don't want the WebPlayback SDK player initialization to lag our player initialization behind
    private isPlayerReady: Promise<void>;
    private resolvePlayerReady!: VoidFunction;

    constructor(private api: SpotifyApi) {
        super();

        this.isPlayerReady = new Promise((resolve) => {
            this.resolvePlayerReady = resolve;
        });
        this.initialize();
    }

    public initialize() {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.head.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            this.onWebPlaybackSDKReady();
        };
    }

    public async setVolume(newVolume: number): Promise<void> {
        await this.isPlayerReady;

        const { volume } = this.playerStore.getState();
        if (newVolume !== volume) {
            this.player.setVolume(newVolume);
            this.playerActions.setVolume(newVolume);
        }
    }

    public async pause(): Promise<void> {
        await this.isPlayerReady;
        this.player.pause();
    }

    public async resume(): Promise<void> {
        try {
            // somehow the player.resume() method doesn't work
            await this.api.player.startResumePlayback(this.deviceId);
        } catch {
            // websdk doesn't handle player response correctly.
        }
    }

    public togglePlay(): void {
        const { paused } = this.playerStore.getState();
        if (paused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    public async setRepeatMode(mode: RepeatMode): Promise<void> {
        const repeatMode =
            mode === RepeatMode.None ? 'off' : mode === RepeatMode.Context ? 'context' : 'track';
        try {
            await this.api.player.setRepeatMode(repeatMode, this.deviceId);
        } catch {
            // websdk doesn't handle player response correctly.
        }
    }

    public async toggleShuffle(isShuffled?: boolean): Promise<void> {
        try {
            await this.api.player.togglePlaybackShuffle(!!isShuffled, this.deviceId);
        } catch {
            // websdk doesn't handle player response correctly.
        }
    }

    public async seek(position: number): Promise<void> {
        await this.isPlayerReady;

        const { totalDuration } = this.playerStore.getState();
        this.player.seek(totalDuration * position * 1000);
        this.playerActions.setPosition(position);
    }

    public async skipToNext(): Promise<void> {
        await this.isPlayerReady;
        this.player.nextTrack();
    }

    public async skipToPrevious(): Promise<void> {
        await this.isPlayerReady;
        this.player.previousTrack();
    }

    public async setPlaybackTracks(trackWindow: PlaybackTrackWindow): Promise<void> {
        const { contextUri, currentTrack, nextTracks, previousTracks } = trackWindow;
        const useOffset = !!contextUri?.match(/^spotify:(album|playlist|user)/);
        const offset = useOffset ? { uri: currentTrack?.uri } : { position: previousTracks.length };
        const tracks = useOffset
            ? undefined
            : [...previousTracks, currentTrack!, ...nextTracks].map((track) => track.uri);

        try {
            await this.api.player.startResumePlayback(
                this.deviceId,
                useOffset ? contextUri! : undefined,
                tracks,
                offset
            );
        } catch {
            // websdk doesn't handle player response correctly.
        }
    }

    private onWebPlaybackSDKReady() {
        const player = new window.Spotify.Player({
            name: 'SpotiTunes',
            getOAuthToken: (cb) => {
                this.api.getAccessToken().then((token) => {
                    if (token) {
                        cb(token.access_token);
                    }
                });
            },
        });

        player.addListener('ready', ({ device_id }) => {
            this.deviceId = device_id;
            this.syncPlayerState();
            this.resolvePlayerReady();
        });
        player.addListener('player_state_changed', (state) => this.onPlayerStateChanged(state));
        player.connect();
        this.player = player;
    }

    private onPlayerStateChanged(state: PlaybackState) {
        const storeState = this.playerStore.getState();

        const duration = Math.floor(state.duration / 1000);
        if (duration !== storeState.totalDuration) {
            this.playerActions.setTotalDuration(duration);
        }

        const position = state.position / state.duration;
        if (position !== storeState.position) {
            this.playerActions.setPosition(Number.isNaN(position) ? 0 : position);
        }

        if (state.paused !== storeState.paused) {
            this.playerActions.setPaused(state.paused);
        }

        if (state.repeat_mode !== storeState.repeatMode) {
            this.playerActions.setRepeatMode(state.repeat_mode);
        }

        if (state.shuffle !== storeState.isShuffled) {
            this.playerActions.toggleShuffled(state.shuffle);
        }

        if (state.track_window.current_track.uri !== storeState.trackWindow.currentTrack?.uri) {
            this.playerActions.setTrackWindow({
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
                const { volume } = this.playerStore.getState();
                if (playerVolume !== volume) {
                    this.playerActions.setVolume(playerVolume);
                }
            });

            this.player
                .getCurrentState()
                .then((state) => state && this.onPlayerStateChanged(state));
        }, 250);
    }

    private async syncPlayerState() {
        const [state, queue] = await Promise.all([
            this.api.player.getPlaybackState(),
            this.api.player.getUsersQueue(),
        ]);

        this.playerActions.toggleShuffled(state.shuffle_state);
        if (state.device.volume_percent) {
            this.playerActions.setVolume(state.device.volume_percent / 100);
        }

        const mapQueueToPlaybackTrack = (track: TrackItem | null) => {
            if (track && 'album' in track) {
                return mapTrackToPlaybackTrack(track);
            }
            return null;
        };

        this.playerActions.setTrackWindow({
            currentTrack: mapQueueToPlaybackTrack(queue.currently_playing),
            nextTracks: queue.queue
                .map(mapQueueToPlaybackTrack)
                .filter(<T>(t: T): t is NonNullable<T> => t !== null),
            previousTracks: [],
            contextUri: state.context?.uri ?? '',
        });
    }
}
