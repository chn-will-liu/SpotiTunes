import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';

export type SimplifiedTrackWithAlbum = SimplifiedTrack & {
    album: SimplifiedAlbum;
};

export type TrackListModel =
    | {
          type: 'savedTracks' | 'album' | 'artistPopularTracks' | 'trackRecommendations';
          tracks: SimplifiedTrackWithAlbum[];
          entityId: string;
      }
    | {
          type: 'savedTracks';
          tracks: SimplifiedTrackWithAlbum[];
      };
