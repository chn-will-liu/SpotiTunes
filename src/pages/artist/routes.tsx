import { RouteObject } from 'react-router-dom';

export const artistRoutes: RouteObject[] = [
    {
        index: true,
        lazy: () => import('./ArtistIndex'),
    },
    {
        path: 'top',
        lazy: () => import('./ArtistUserTop'),
    },
    {
        path: ':artistId',
        lazy: () => import('./Artist'),
        children: [
            {
                index: true,
                lazy: () => import('./ArtistPopular'),
            },
            {
                path: 'albums',
                lazy: () => import('./ArtistAlbums'),
            },
            {
                path: 'related',
                lazy: () => import('./ArtistRelated'),
            },
        ],
    },
];
