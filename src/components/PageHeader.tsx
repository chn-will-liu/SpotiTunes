import { Image } from '@spotify/web-api-ts-sdk';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { usePromoninentColor } from '../hooks/useProminentColor';
import { pickImage } from '../utils';
import { AppBgContext } from './AppBgColor';
import { SpotiImage } from './SpotiImage';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

export type PageHeaderProps = PropsWithChildren<{
    type: 'Song' | 'Artist' | 'Album' | 'Playlist';
    images: Image[];
    header: string;
}>;

export const PageHeader = (props: PageHeaderProps) => {
    const image = pickImage(props.images, 240);
    const bgColor = usePromoninentColor(image);
    const isArtist = props.type === 'Artist';

    const { setBg } = useContext(AppBgContext);

    useEffect(() => {
        if (bgColor) {
            setBg({ color: bgColor });
        }
    }, [bgColor, image, setBg]);

    return (
        <header className="flex items-end gap-5 px-6 py-8">
            <div
                className="absolute inset-0 top-0 z-[-1] h-[700px] w-full bg-gradient-to-t from-transparent via-[var(--page-header-bg-from)] via-20% to-[var(--page-header-bg-to)]"
                style={{
                    '--page-header-bg-to': bgColor,
                    '--page-header-bg-from': 'hsl(from var(--page-header-bg-to) h s l / 0)',
                }}
            ></div>
            <SpotiImage
                images={props.images}
                size={240}
                alt={props.header}
                type={isArtist ? 'artist' : 'album'}
            />
            <div className="text-shadow-lg">
                {!isArtist && <div>{props.type}</div>}
                <h1 className="text-[5rem] font-semibold">{props.header}</h1>
                {props.children}
            </div>
        </header>
    );
};
