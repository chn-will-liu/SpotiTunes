/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { SdkContext } from '../spotify/SdkContext';

type QueryOptions<
    K extends keyof SpotifyApi,
    S extends keyof SpotifyApi[K],
    T extends keyof SpotifyApi[K][S],
> = {
    api: SpotifyApi[K] extends (...args: any) => any
        ? [K]
        : SpotifyApi[K][S] extends (...args: any) => any
          ? [K, S]
          : [K, S, T];
    queryKey: SpotifyApi[K] extends (...args: infer P1) => any
        ? P1
        : SpotifyApi[K][S] extends (...args: infer P2) => any
          ? P2
          : SpotifyApi[K][S][T] extends (...args: infer P3) => any
            ? P3
            : never;
    staleTime?: number;
    enabled?: boolean;
};

type QueryResult<
    K extends keyof SpotifyApi,
    S extends keyof SpotifyApi[K],
    T extends keyof SpotifyApi[K][S],
> = SpotifyApi[K] extends (...args: any) => infer R1
    ? R1
    : SpotifyApi[K][S] extends (...args: any) => infer R2
      ? R2
      : SpotifyApi[K][S][T] extends (...args: any) => infer R3
        ? R3
        : never;

export function useSpotify<
    K extends keyof SpotifyApi,
    S extends keyof SpotifyApi[K],
    T extends keyof SpotifyApi[K][S],
>(options: QueryOptions<K, S, T>): UseQueryResult<Awaited<QueryResult<K, S, T>>> {
    const sdk = useContext(SdkContext);

    return useQuery({
        retry: 0,
        staleTime: options.staleTime ?? 1000 * 60 * 30,
        enabled: options.enabled,
        queryKey: ['spotify', 'api', ...options.api, ...(options.queryKey ?? [])],
        queryFn: ({ signal }) => {
            sdk.setAbortSignalOnceForApi(signal);

            let api: any = sdk.api;
            let host: any = sdk;
            for (const key of options.api) {
                host = api;
                api = api[key];
            }
            return api.apply(host, options.queryKey);
        },
    });
}
