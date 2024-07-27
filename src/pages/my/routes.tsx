import { RouteObject } from 'react-router-dom';

export const myRoutes: RouteObject[] = [
    {
        index: true,
        lazy: () => import('./My'),
    },
    {
        path: 'artists',
        lazy: () => import('./MySavedArtists'),
    },
    {
        path: 'albums',
        lazy: () => import('./MySavedAlbums'),
    },
    {
        path: 'playlists',
        lazy: () => import('./MyPlaylists'),
    },
    {
        path: 'favorite',
        lazy: () => import('./MyFavorite'),
    },
];
