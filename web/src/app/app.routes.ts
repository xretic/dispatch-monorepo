import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
];
