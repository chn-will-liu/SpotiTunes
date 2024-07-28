import { Episode, Image, Track, TrackItem } from '@spotify/web-api-ts-sdk';

export const pickImage = (images: Image[], size: number): Image | null => {
    if (!images || images.length === 0) return null;
    for (const image of images.sort((a, b) => a.width - b.width)) {
        if (image.width >= size) {
            return image;
        }
    }
    return images[images.length - 1];
};

export const isTrack = (item: TrackItem): item is Track => {
    return item && item.type === 'track';
};

export const isEpisode = (item: TrackItem): item is Episode => {
    return item.type === 'episode';
};
