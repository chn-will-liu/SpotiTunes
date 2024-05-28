import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SdkContext } from './SpotifySdk';

type ApiCall<T> = (api: SpotifyApi) => Promise<T>;

export function useSpotify<T>(apiCall: ApiCall<T>) {
    const sdk = useContext(SdkContext);
    const [result, setResult] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    const callApiWithSdk = useCallback(apiCall, []);

    useEffect(() => {
        const abortController = new AbortController();
        sdk.setAbortSignalOnceForApi(abortController.signal);
        callApiWithSdk(sdk.api)
            .then((result) => {
                setResult(result);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });

        return () => abortController.abort();
    }, [callApiWithSdk, setResult, sdk, setLoading, setError]);

    return [result, loading, error] as const;
}
