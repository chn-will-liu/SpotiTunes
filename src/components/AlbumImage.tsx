import { Image } from '@spotify/web-api-ts-sdk';
import { useMemo } from 'react';
import { BiSolidAlbum } from 'react-icons/bi';
import { pickImage } from '../utils';

export const AlbumImage = ({
    images,
    size,
    alt,
}: {
    images: Image[];
    size: number;
    alt: string;
}) => {
    const albumImage = useMemo(() => pickImage(images, size), [images, size]);
    return (
        <div className="shadow-md">
            {albumImage ? (
                <img
                    src={albumImage?.url}
                    alt={alt}
                    className="rounded-md"
                    style={{ width: size + 'px', height: size + 'px' }}
                />
            ) : (
                <div className="rounded-md bg-white bg-opacity-65">
                    <BiSolidAlbum style={{ width: size + 'px', height: size + 'px' }} />
                </div>
            )}
        </div>
    );
};
