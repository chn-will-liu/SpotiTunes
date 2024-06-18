import { useSpotify } from './useSpotify';

export const useTrackRecommendations = (trackId?: string) => {
    const data = useSpotify(
        (api) => api.recommendations.get({ limit: 10, seed_tracks: [trackId!] }),
        {
            enabled: !!trackId,
            queryKey: [trackId, 10],
        }
    );

    return {
        isLoading: data.isLoading,
        isError: data.isError,
        tracks: data.data?.tracks,
    };
};
