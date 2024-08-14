import { RouteObject } from 'react-router-dom';

export const searchRoutes: RouteObject[] = [
    {
        index: true,
        lazy: () => import('./Search'),
    },
    {
        path: ':searchText',
        lazy: () => import('./Search'),
    },
    {
        path: ':searchText/:searchType',
        lazy: () => import('./Search'),
    },
];
