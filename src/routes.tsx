import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { albumRoutes } from './pages/album/routes';
import { artistRoutes } from './pages/artist/routes';
import { ErrorNotFound } from './pages/ErrorNotFound';
import { myRoutes } from './pages/my/routes';
import { playlistRoutes } from './pages/playlists/routes';
import { trackRoutes } from './pages/track/routes';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                lazy: () => import('./pages/home/Home'),
            },
            {
                path: 'discover',
                lazy: () => import('./pages/discover/Discover'),
            },
            {
                path: 'search',
                element: <div>Search</div>,
            },
            {
                path: 'my',
                children: myRoutes,
            },
            {
                path: 'track',
                children: trackRoutes,
            },
            {
                path: 'artist',
                children: artistRoutes,
            },
            {
                path: 'playlist',
                children: playlistRoutes,
            },
            {
                path: 'album',
                children: albumRoutes,
            },
            {
                path: 'category/:categoryId',
                lazy: () => import('./pages/category/Category'),
            },
            {
                path: '*',
                Component: ErrorNotFound,
            },
        ],
    },
]);
