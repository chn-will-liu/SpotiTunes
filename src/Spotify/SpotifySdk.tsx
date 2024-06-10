import {
    AuthorizationCodeWithPKCEStrategy,
    IAuthStrategy,
    Scopes,
    SpotifyApi,
} from '@spotify/web-api-ts-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { WebPlayer } from './WebPlayer/WebPlayer';

export type SpotifySdk = {
    api: SpotifyApi;
    player: WebPlayer;
    setAbortSignalOnceForApi: (signal: AbortSignal) => void;
};

const createSpofitySdk = (auth: IAuthStrategy): SpotifySdk => {
    let signal: AbortSignal | null = null;
    const api = new SpotifyApi(auth, {
        beforeRequest: (_url, request) => {
            request.signal = signal;
            signal = null;
        },
    });

    return {
        api,
        player: new WebPlayer(),
        setAbortSignalOnceForApi: (newSignal) => {
            signal = newSignal;
        },
    };
};

const queryClient = new QueryClient();

export const SdkContext = createContext<SpotifySdk>({} as SpotifySdk);

export const SpotifySdk = ({ children }: PropsWithChildren) => {
    const sdkinitialized = useRef(false);
    const [sdk, setSdk] = useState<SpotifySdk | null>(null);

    useEffect(() => {
        (async () => {
            if (sdkinitialized.current) return;
            sdkinitialized.current = true;

            const scope = Scopes.all;
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? '';
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('code');
            const redirectUrl = currentUrl.toString();
            const auth = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUrl, scope);
            const internalSdk = createSpofitySdk(auth);

            try {
                const { authenticated } = await internalSdk.api.authenticate();

                if (authenticated) {
                    setSdk(() => internalSdk);
                }
            } catch (e: Error | unknown) {
                console.error(e);
            }
        })();
    }, []);

    if (!sdk) return <></>;
    return (
        <SdkContext.Provider value={sdk}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SdkContext.Provider>
    );
};
