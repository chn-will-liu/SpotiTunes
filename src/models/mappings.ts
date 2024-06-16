import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { PlaybackTrack } from '../spotify/webPlayer/types';
import { SimplifiedTrackWithAlbum, TrackListModel } from './TrackListModel';

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
        artists: track.artists.map((a) => ({ name: a.name, id: a.id })),
        album: { id: album.id, name: album.name, images: album.images },
    };
};

export const mapTrackToPlaybackTrack = (track: SimplifiedTrackWithAlbum): PlaybackTrack => {
    return mapSimplifiedTrackToPlaybackTrack(track, track.album);
};

export const mapTrackListToPlaybackTracks = (trackList: TrackListModel): PlaybackTrack[] => {
    return trackList.tracks.map((track) => mapTrackToPlaybackTrack(track));
};
