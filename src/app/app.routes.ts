import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then((mod) => mod.ProductsComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./components/contact-us/contact-us.component').then((mod) => mod.ContactUsComponent),
  },
  {
    path: 'about-us',
    loadComponent: () => import('./components/about-us/about-us.component').then((mod) => mod.AboutUsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/page-not-found/page-not-found.component').then((mod) => mod.PageNotFoundComponent),
  },
];
