import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { artistRoutes } from './pages/artist/routes';
import { PageFavorite } from './pages/Favorite';
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
                path: 'artists',
                element: <div>Artists</div>,
            },
            {
                path: 'albums',
                element: <div>Albums</div>,
            },
            {
                path: 'podcasts',
                element: <div>Podcasts</div>,
            },
            {
                path: 'my/favorite',
                Component: PageFavorite,
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
                path: 'album/:albumId',
                lazy: () => import('./pages/album/Album'),
            },
        ],
    },
]);
