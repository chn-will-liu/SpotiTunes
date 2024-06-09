import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { PageArtist } from './pages/Artist';
import { PageFavorite } from './pages/Favorite';
import { PageTrack } from './pages/Track';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
                element: <PageFavorite />,
            },
            {
                path: 'track/:trackId',
                element: <PageTrack />,
            },
            {
                path: 'artist/:artistId',
                element: <PageArtist />,
            },
        ],
    },
]);
