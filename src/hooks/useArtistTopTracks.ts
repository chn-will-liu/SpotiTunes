import { Market } from '@spotify/web-api-ts-sdk';
import { useSpotify } from './useSpotify';

export const useArtistTopTracks = (artistId: string) => {
    const { data: artist, isLoading: loadingArtist } = useSpotify(
        (api) => api.artists.get(artistId!),
        {
            enabled: !!artistId,
            queryKey: [artistId],
        }
    );

    const { data: user, isLoading: laodingUser } = useSpotify((api) => api.currentUser.profile());

    const { data: topTracks, isLoading: loadingTopTracks } = useSpotify(
        (api) => api.artists.topTracks(artistId!, user?.country as Market),
        {
            enabled: !!artist && !!user?.country,
            queryKey: [artistId, user?.country],
        }
    );

    return {
        artist,
        topTracks,
        isLoading: loadingArtist || laodingUser || loadingTopTracks,
    };
};
