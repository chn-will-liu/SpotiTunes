import { Market } from '@spotify/web-api-ts-sdk';
import { useSpotify } from './useSpotify';

export const useArtistTopTracks = (artistId: string) => {
    const { data: artist } = useSpotify((api) => api.artists.get(artistId!), {
        enabled: !!artistId,
        queryKey: [artistId],
    });

    const { data: user } = useSpotify((api) => api.currentUser.profile());

    const {
        data: topTracks,
        isPending,
        isLoading,
    } = useSpotify((api) => api.artists.topTracks(artistId!, user?.country as Market), {
        enabled: !!artistId && !!user?.country,
        queryKey: [artistId, user?.country],
    });

    return {
        artist,
        topTracks,
        isLoading: isLoading && isPending,
    };
};
