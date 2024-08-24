import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';

export type SimplifiedTrackWithAlbum = SimplifiedTrack & {
    album: SimplifiedAlbum;
};

export type TrackListModel = {
    contextUri?: string;
    tracks: SimplifiedTrackWithAlbum[];
};
