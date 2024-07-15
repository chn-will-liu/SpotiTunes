import { RouteObject } from 'react-router-dom';

export const playlistRoutes: RouteObject[] = [
    {
        path: 'popular',
        lazy: () => import('./PopularPlaylists'),
    },
    {
        path: ':playlistId',
        lazy: () => import('./Playlist'),
    },
];
