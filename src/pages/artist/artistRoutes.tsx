import { RouteObject } from 'react-router-dom';

export const artistRoutes: RouteObject[] = [
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
        ],
    },
];
