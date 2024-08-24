import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { QueryClient } from '@tanstack/react-query';
import { PlaybackTrackWindow, RepeatMode } from './playerStore.types';
import { PreviewPlaybackPlayer } from './PreviewPlaybackPlayer';
import { WebPlaybackPlayer } from './WebPlaybackPlayer';

export abstract class AbstractPlayer {
    public abstract initialize(): Promise<void>;
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
}

export async function createWebPlayer(
    api: SpotifyApi,
    queryClient: QueryClient
): Promise<AbstractPlayer> {
    const profile = await queryClient.fetchQuery({
        queryKey: ['spotify', 'api', 'currentUser', 'profile'],
        queryFn: () => api.currentUser.profile(),
    });

    let player: AbstractPlayer;
    if (profile.product === 'free' || profile.product === 'open') {
        player = new PreviewPlaybackPlayer();
    } else {
        player = new WebPlaybackPlayer(api);
    }

    await player.initialize();
    return player;
}
