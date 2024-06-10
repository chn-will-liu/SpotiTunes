import { RouteObject } from 'react-router-dom';

export const artistRoutes: RouteObject[] = [
    {
        path: ':artistId',
        lazy: () => import('./Artist'),
        children: [
            {
                path: '',
                lazy: () => import('./ArtistPopular'),
            },
            {
                path: 'popular',
                element: <div>Popular</div>,
            },
        ],
    },
];
