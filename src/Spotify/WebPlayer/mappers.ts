import { Track } from '@spotify/web-api-ts-sdk';
import { PlaybackTrack } from './types';

export const mapTrackToPlaybackTrack = (track: Track): PlaybackTrack => {
    return {
        id: track.id,
        uri: track.uri,
        type: track.type,
        name: track.name,
        resouceUrl: track.preview_url,
        artists: track.artists.map((a) => ({ name: a.name, uri: a.uri })),
        album: { uri: track.album.uri, name: track.album.name, images: track.album.images },
    };
};
