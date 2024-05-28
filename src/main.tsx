import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { PageFavorite } from './components/Favorite.tsx';
import './index.css';
import { SpotifySdk } from './Spotify/SpotifySdk.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'home',
                element: <div>Home</div>,
            },
            {
                path: 'my/favorite',
                element: <PageFavorite />,
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpotifySdk>
            <RouterProvider router={router} />
        </SpotifySdk>
    </React.StrictMode>
);
