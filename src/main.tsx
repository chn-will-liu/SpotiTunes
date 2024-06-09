import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes.tsx';
import { SpotifySdk } from './Spotify/SpotifySdk.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpotifySdk>
            <RouterProvider router={router} />
        </SpotifySdk>
    </React.StrictMode>
);
