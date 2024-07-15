import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { useSpotify } from './useSpotify';

export const useAlbumTracks = (albumId?: string) => {
    const { data: [album] = [], isLoading } = useSpotify({
        api: ['albums', 'get'],
        queryKey: [[albumId!]],
        enabled: !!albumId,
    });

    if (isLoading) return { album: null, tracks: [], isLoading: true };
    if (!album) return { album: null, tracks: [], isLoading: false };

    const simplifiedAlbum: SimplifiedAlbum = { ...album, album_group: 'album' };
    const tracks = album.tracks.items.map((track) => ({ ...track, album: simplifiedAlbum }));

    return { album, tracks, isLoading: false };
};
