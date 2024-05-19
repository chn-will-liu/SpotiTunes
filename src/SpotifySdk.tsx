import {
    AuthorizationCodeWithPKCEStrategy,
    IAuthStrategy,
    Scopes,
    SpotifyApi,
} from '@spotify/web-api-ts-sdk';
import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';

export type SpotifyApiWithAbort = SpotifyApi & {
    setAbortSignalOnce: (signal: AbortSignal) => void;
};

const createSpofitySdk = (auth: IAuthStrategy): SpotifyApiWithAbort => {
    let signal: AbortSignal | null = null;
    const sdk = new SpotifyApi(auth, {
        beforeRequest: (_url, request) => {
            request.signal = signal;
            signal = null;
        },
    }) as SpotifyApiWithAbort;

    sdk.setAbortSignalOnce = (s) => {
        signal = s;
    };

    return sdk;
};

export const SdkContext = createContext<SpotifyApiWithAbort>({} as SpotifyApiWithAbort);

export const SpotifySdk = ({ children }: PropsWithChildren) => {
    const sdkinitialized = useRef(false);
    const [sdk, setSdk] = useState<SpotifyApiWithAbort | null>(null);

    useEffect(() => {
        (async () => {
            if (sdkinitialized.current) return;
            sdkinitialized.current = true;

            const scope = Scopes.userDetails;
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? '';
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('code');
            const redirectUrl = currentUrl.toString();
            const auth = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUrl, scope);
            const internalSdk = createSpofitySdk(auth);

            try {
                const { authenticated } = await internalSdk.authenticate();

                if (authenticated) {
                    setSdk(() => internalSdk);
                }
            } catch (e: Error | unknown) {
                console.error(e);
            }
        })();
    }, []);

    if (!sdk) return <></>;
    return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
};
