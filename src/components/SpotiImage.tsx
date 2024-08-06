import { Image } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BiSolidAlbum } from 'react-icons/bi';
import { useImageLoader } from '../hooks/useImageLoader';
import { pickImage } from '../utils';
import { SkeletonItem } from './skeletons/SkeletonItem';

export type SpImageProps = {
    images: Image[];
    size: number;
    displaySize?: number | 'full';
    alt: string;
    rounded?: 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'none';
    className?: string;
};

export const SpotiImage = ({
    images,
    size,
    displaySize,
    alt,
    className,
    rounded = 'md',
}: SpImageProps) => {
    const image = useMemo(() => pickImage(images, size), [images, size]);
    const { loaded } = useImageLoader(image?.url);
    let style = {};
    if (displaySize === 'full') {
        style = { width: '100%' };
    } else {
        style = { width: `${displaySize ?? size}px` };
    }

    rounded = 'rounded-' + rounded;

    return (
        <div className={`${rounded} aspect-square shadow-lg ${className ?? ''}`} style={style}>
            {image ? (
                loaded ? (
                    <img
                        src={image?.url}
                        alt={alt}
                        className={`${rounded} size-full object-cover`}
                    />
                ) : (
                    <SkeletonItem className={`${rounded} size-full object-cover`} />
                )
            ) : (
                <div className={`${rounded} size-full bg-white bg-opacity-65`}>
                    <BiSolidAlbum className="size-full" />
                </div>
            )}
        </div>
    );
};
