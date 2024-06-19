import { RouteObject } from 'react-router-dom';

export const trackRoutes: RouteObject[] = [
    {
        path: ':trackId',
        lazy: () => import('./Track'),
        children: [
            {
                index: true,
                lazy: () => import('./TrackRecommended'),
            },
            {
                path: 'related-artists',
                lazy: () => import('./TrackArtistRelated'),
            },
            {
                path: 'album-tracks',
                lazy: () => import('./TrackAlbum'),
            },
            {
                path: 'artist-tracks',
                lazy: () => import('./TrackArtistPopularTracks'),
            },
        ],
    },
];
