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

export const formatDurationMs = (durationMs: number): string => {
    return formatDuration(durationMs / 1000);
};

export const formatDuration = (durationMs: number): string => {
    const minutes = Math.round(durationMs / 60);
    const seconds = Math.round(durationMs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
