import { Image } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BiSolidAlbum } from 'react-icons/bi';
import { pickImage } from '../utils';

export type SpImageProps = {
    type?: 'album' | 'artist';
    images: Image[];
    size: number;
    displaySize?: number | 'full';
    alt: string;
    className?: string;
};

export const SpotiImage = ({
    images,
    size,
    displaySize,
    alt,
    className,
    type = 'album',
}: SpImageProps) => {
    const image = useMemo(() => pickImage(images, size), [images, size]);
    let style = {};
    if (displaySize === 'full') {
        style = { width: '100%' };
    } else {
        style = { width: `${displaySize ?? size}px` };
    }

    const rounded = type === 'artist' ? 'rounded-full' : 'rounded-md';

    return (
        <div className={`${rounded} aspect-square shadow-lg ${className ?? ''}`} style={style}>
            {image ? (
                <img src={image?.url} alt={alt} className={`${rounded} size-full object-cover`} />
            ) : (
                <div className={`${rounded} size-full bg-white bg-opacity-65`}>
                    <BiSolidAlbum className="size-full" />
                </div>
            )}
        </div>
    );
};
