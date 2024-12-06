import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./form/form.component').then((c) => c.FormComponent),
  },
];
