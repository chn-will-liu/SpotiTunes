import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { SdkContext } from '../spotify/SdkContext';

type ApiCall<R> = (api: SpotifyApi) => Promise<R>;

type QueryOptions = {
    queryKey?: (string | number | boolean | undefined)[];
    staleTime?: number;
    enabled?: boolean;
};

export function useSpotify<R>(apiCall: ApiCall<R>, options?: QueryOptions) {
    const sdk = useContext(SdkContext);
    const apiName =
        apiCall.toString().match(/(?<=>\s?\w+)(\.\w+)+(?=\()/)?.[0] ?? apiCall.toString();

    return useQuery({
        ...options,
        staleTime: 1000 * 60 * 30,
        retry: 0,
        queryKey: ['spotify', 'api', apiName, ...(options?.queryKey ?? [])],
        queryFn: ({ signal }) => {
            sdk.setAbortSignalOnceForApi(signal);
            return apiCall(sdk.api);
        },
    });
}
