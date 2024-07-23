import { RouteObject } from 'react-router-dom';

export const albumRoutes: RouteObject[] = [
    {
        index: true,
        lazy: () => import('./AlbumList'),
    },
    {
        path: 'new-releases',
        lazy: () => import('./AlbumNewRelease'),
    },
    {
        path: ':albumId',
        lazy: () => import('./Album'),
    },
];
