import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { PlaybackTrack } from '../spotify/webPlayer/playerStore.types';
import { SimplifiedTrackWithAlbum } from './TrackListModel';

export const mapSimplifiedTrackToPlaybackTrack = (
    track: SimplifiedTrack,
    album: SimplifiedAlbum
): PlaybackTrack => {
    return {
        id: track.id,
        uri: track.uri,
        type: track.type,
        name: track.name,
        resouceUrl: track.preview_url,
        artists: track.artists.map((a) => ({ name: a.name, uri: a.uri })),
        album: { uri: album.uri, name: album.name, images: album.images },
    };
};

export const mapTrackToPlaybackTrack = (track: SimplifiedTrackWithAlbum): PlaybackTrack => {
    return mapSimplifiedTrackToPlaybackTrack(track, track.album);
};

export const mapTrackListToPlaybackTracks = (
    tracks: SimplifiedTrackWithAlbum[]
): PlaybackTrack[] => {
    return tracks.map((track) => mapTrackToPlaybackTrack(track));
};
