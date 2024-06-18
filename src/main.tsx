import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeColor } from './components/AppThemeColor.tsx';
import './index.css';
import { router } from './routes.tsx';
import { SpotifySdk } from './spotify/SpotifySdk.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpotifySdk>
            <ThemeColor color="transparent">
                <RouterProvider router={router} />
            </ThemeColor>
        </SpotifySdk>
    </React.StrictMode>
);
