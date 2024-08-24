import { Image } from '@spotify/web-api-ts-sdk';
import {
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { useProminentColor } from '../../hooks/useProminentColor';
import { pickImage } from '../../utils';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { SpotiImage } from '../SpotiImage';
import { AppBgContext } from './AppBgColor';

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
            <div className="flex-1 text-shadow-lg">
                {!isArtist && <div>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</div>}
                <h1 className="font-normal">
                    <HeaderText header={props.header} />
                </h1>
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
                <SkeletonItem className="mb-4 h-20 w-1/3" />
                <SkeletonItem className="mb-2 h-5 w-3/5" />
                <SkeletonItem className="h-5 w-2/5" />
            </div>
        </header>
    );
};

const HeaderText = (props: { header: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [fontSizeRem, setFontSizeRem] = useState(2);
    const currentFontSizeRem = useRef(fontSizeRem);
    currentFontSizeRem.current = fontSizeRem;

    const updateFontSize = useCallback(() => {
        if (!ref.current || !ref.current.parentElement) return;

        const currentRem = currentFontSizeRem.current;
        const textWidth = ref.current.getBoundingClientRect().width;
        const parentWidth = ref.current.parentElement.getBoundingClientRect().width * 0.8;

        let adjustedFontSize = currentRem;
        let adjustedWidth = textWidth;
        const maxRem = 5;
        const minRem = 2;

        // when text is too long, reduce font size
        while (adjustedWidth > parentWidth && adjustedFontSize > minRem) {
            adjustedWidth = (adjustedWidth * (adjustedFontSize - 0.25)) / adjustedFontSize;
            if (adjustedWidth > parentWidth) {
                adjustedFontSize -= 0.25;
            }
        }

        // when text is too short, increase font size
        while (adjustedWidth < parentWidth && adjustedFontSize < maxRem) {
            adjustedWidth = (adjustedWidth * (adjustedFontSize + 0.25)) / adjustedFontSize;
            if (adjustedWidth < parentWidth) {
                adjustedFontSize += 0.25;
            }
        }

        if (adjustedFontSize !== currentRem) {
            setFontSizeRem(adjustedFontSize);
        }
    }, [ref]);

    useLayoutEffect(() => updateFontSize(), [updateFontSize]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => updateFontSize());
        resizeObserver.observe(ref.current!.parentElement!);
        return () => resizeObserver.disconnect();
    }, [updateFontSize]);

    return (
        <div className="line-clamp-3">
            <span
                className=" break-words font-normal"
                ref={ref}
                style={{ fontSize: fontSizeRem + 'rem' }}
            >
                {props.header}
            </span>
        </div>
    );
};
