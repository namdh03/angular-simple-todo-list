import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'planning',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'processing',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
  },
];
