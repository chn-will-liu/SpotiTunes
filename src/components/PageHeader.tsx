import { Image } from '@spotify/web-api-ts-sdk';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { useProminentColor } from '../hooks/useProminentColor';
import { pickImage } from '../utils';
import { AppBgContext } from './shell/AppBgColor';
import { SkeletonItem } from './skeletons/SkeletonItem';
import { SpotiImage } from './SpotiImage';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

const HeaderBg = () => {
    const { bg } = useContext(AppBgContext);
    return (
        <div
            className="absolute inset-0 top-0 z-[-1] h-[700px] w-full bg-gradient-to-t from-transparent via-[var(--page-header-bg-from)] via-20% to-[var(--page-header-bg-to)]"
            style={{
                '--page-header-bg-to': bg.color,
                '--page-header-bg-from': 'hsl(from var(--page-header-bg-to) h s l / 0)',
            }}
        ></div>
    );
};

export type PageHeaderProps = PropsWithChildren<{
    type: 'song' | 'artist' | 'album' | 'playlist';
    images: Image[];
    header: string;
}>;

export const PageHeader = (props: PageHeaderProps) => {
    const image = pickImage(props.images, 240);
    const bgColor = useProminentColor(image);
    const isArtist = props.type === 'artist';

    const { setBg } = useContext(AppBgContext);

    useEffect(() => {
        if (bgColor) {
            setBg({ color: bgColor });
        }
    }, [bgColor, image, setBg]);

    return (
        <header className="flex items-end gap-5 px-6 py-8">
            <HeaderBg />
            <SpotiImage
                images={props.images}
                size={240}
                alt={props.header}
                rounded={isArtist ? 'full' : 'md'}
            />
            <div className="text-shadow-lg">
                {!isArtist && <div>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</div>}
                <h1 className="text-[5rem] font-normal">{props.header}</h1>
                {props.children}
            </div>
        </header>
    );
};

export const PageHeaderSkeleton = (props: { type?: PageHeaderProps['type'] }) => {
    const isArtist = props.type === 'artist';

    return (
        <header className="flex items-end gap-5 px-6 py-8">
            <HeaderBg />
            <SkeletonItem className={`size-[240px] ${isArtist ? 'rounded-full' : 'rounded-md'}`} />
            <div className="flex-1">
                {!isArtist && <SkeletonItem className="mb-4 h-5 w-20" />}
                <SkeletonItem className="mb-4 h-12 w-2/3" />
                <SkeletonItem className="mb-2 h-5 w-3/5" />
                <SkeletonItem className="h-5 w-2/5" />
            </div>
        </header>
    );
};
