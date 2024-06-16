import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { artistRoutes } from './pages/artist/routes';
import { PageFavorite } from './pages/Favorite';
import { PageTrack } from './pages/Track';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'home',
                element: <div>Home</div>,
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
                path: 'track/:trackId',
                Component: PageTrack,
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
