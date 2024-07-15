import { Market } from '@spotify/web-api-ts-sdk';
import { useSpotify } from './useSpotify';

export const useArtistTopTracks = (artistId?: string) => {
    const { data: [artist] = [], isLoading: loadingArtist } = useSpotify({
        api: ['artists', 'get'],
        enabled: !!artistId,
        queryKey: [[artistId!]],
    });

    const { data: user, isLoading: laodingUser } = useSpotify({
        api: ['currentUser', 'profile'],
        queryKey: [],
    });

    const { data: topTracks, isLoading: loadingTopTracks } = useSpotify({
        api: ['artists', 'topTracks'],
        enabled: !!artist && !!user?.country,
        queryKey: [artistId!, user?.country as Market],
    });

    return {
        artist,
        topTracks,
        isLoading: loadingArtist || laodingUser || loadingTopTracks,
    };
};
