import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { albumRoutes } from './pages/album/routes';
import { artistRoutes } from './pages/artist/routes';
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
                path: 'library',
                element: <div>Library</div>,
            },
            {
                path: 'radio',
                element: <div>Radio</div>,
            },
            {
                path: 'podcasts',
                element: <div>Podcasts</div>,
            },
            {
                path: 'my/favorite',
                lazy: () => import('./pages/Favorite'),
            },
            {
                path: 'track',
                children: [...trackRoutes],
            },
            {
                path: 'artist',
                children: [...artistRoutes],
            },
            {
                path: 'playlist',
                children: [...playlistRoutes],
            },
            {
                path: 'album',
                children: [...albumRoutes],
            },
            {
                path: 'category/:categoryId',
                lazy: () => import('./pages/category/Category'),
            },
            {
                path: '*',
                lazy: () => import('./pages/ErrorNotFound'),
            },
        ],
    },
]);
