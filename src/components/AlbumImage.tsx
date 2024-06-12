import { Image } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BiSolidAlbum } from 'react-icons/bi';
import { pickImage } from '../utils';

export type AlbumImageProps = {
    images: Image[];
    size: number;
    displaySize?: number | 'full';
    alt: string;
    className?: string;
};

export const AlbumImage = ({ images, size, displaySize, alt, className }: AlbumImageProps) => {
    const albumImage = useMemo(() => pickImage(images, size), [images, size]);
    let style = {};
    if (displaySize === 'full') {
        style = { width: '100%' };
    } else {
        style = { width: `${displaySize ?? size}px` };
    }
    return (
        <div className={`aspect-square shadow-lg ${className ?? ''}`} style={style}>
            {albumImage ? (
                <img
                    src={albumImage?.url}
                    alt={alt}
                    className="size-full rounded-md object-cover"
                />
            ) : (
                <div className="size-full rounded-md bg-white bg-opacity-65">
                    <BiSolidAlbum className="size-full" />
                </div>
            )}
        </div>
    );
};
