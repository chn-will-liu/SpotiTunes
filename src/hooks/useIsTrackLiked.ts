import { useSpotify } from './useSpotify';

export const useIsTrackLiked = (trackId?: string) => {
    const { data: likedTracks } = useSpotify((api) => api.currentUser.tracks.savedTracks(), {
        enabled: !!trackId,
        staleTime: Infinity,
    });

    if (!likedTracks) return false;

    return likedTracks.items.some((item) => item.track.id === trackId);
};
