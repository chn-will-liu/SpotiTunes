import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { QueryClient } from '@tanstack/react-query';
import { PreviewPlaybackPlayer } from './PreviewPlaybackPlayer';
import { WebPlaybackPlayer } from './WebPlaybackPlayer';
import { WebPlayer } from './WebPlayer';

export async function createWebPlayer(
    api: SpotifyApi,
    queryClient: QueryClient
): Promise<WebPlayer> {
    const profile = await queryClient.fetchQuery({
        queryKey: ['spotify', 'api', 'currentUser', 'profile'],
        queryFn: () => api.currentUser.profile(),
    });

    let player: WebPlayer;
    if (profile.product === 'free' || profile.product === 'open') {
        player = new PreviewPlaybackPlayer();
    } else {
        player = new WebPlaybackPlayer(api);
    }

    return player;
}
