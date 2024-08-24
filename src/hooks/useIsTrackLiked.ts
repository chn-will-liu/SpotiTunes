import { useSpotify } from './useSpotify';

export const useIsTrackLiked = (trackId?: string | null) => {
    const { data: likedTracks } = useSpotify({
        api: ['currentUser', 'tracks', 'savedTracks'],
        queryKey: [],
        enabled: !!trackId,
    });

    if (!likedTracks) return false;

    return likedTracks.items.some((item) => item.track.id === trackId);
};
