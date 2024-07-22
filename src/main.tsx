import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppBg } from './components/shell/AppBgColor.tsx';
import './index.css';
import { router } from './routes.tsx';
import { SpotifySdk } from './spotify/SpotifySdk.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpotifySdk>
            <AppBg color="transparent">
                <RouterProvider router={router} />
            </AppBg>
        </SpotifySdk>
    </React.StrictMode>
);
