import { useSpotify } from './useSpotify';

export const useTrackRecommendations = (trackId?: string) => {
    const data = useSpotify({
        enabled: !!trackId,
        api: ['recommendations', 'get'],
        queryKey: [{ limit: 10, seed_tracks: [trackId!] }],
    });

    return {
        isLoading: data.isLoading,
        isError: data.isError,
        tracks: data.data?.tracks,
    };
};
