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
                path: 'related',
                lazy: () => import('./TrackArtistRelated'),
            },
            {
                path: 'album',
                lazy: () => import('./TrackAlbum'),
            },
        ],
    },
];
