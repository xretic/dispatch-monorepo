import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((m) => m.Register),
    },
];
