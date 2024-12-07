import { Routes, UrlSegment } from '@angular/router';

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
  {
    matcher: (segments) =>
      segments.length >= 1 && segments[0].path.startsWith('@')
        ? {
            consumed: segments,
            // consumed: [new UrlSegment(segments[0].path.slice(1), {})],
            posParams: {
              slug: new UrlSegment(segments[0].path.slice(1), {}),
            },
          }
        : null,
    loadComponent: () =>
      import('./detail/detail.component').then((c) => c.DetailComponent),
  },
];
