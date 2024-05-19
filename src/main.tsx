import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SpotifySdk } from './SpotifySdk.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpotifySdk>
            <App />
        </SpotifySdk>
    </React.StrictMode>
);
