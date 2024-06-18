import { Image } from '@spotify/web-api-ts-sdk';

export const pickImage = (images: Image[], size: number): Image | null => {
    if (!images || images.length === 0) return null;
    for (const image of images.sort((a, b) => a.width - b.width)) {
        if (image.width >= size) {
            return image;
        }
    }
    return images[images.length - 1];
};
