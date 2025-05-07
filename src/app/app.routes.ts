import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bio',
    loadComponent: () =>
      import('./pages/bio/bio.component').then((m) => m.BioComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  }
  ,
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./pages/juegos/ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
  },
  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('./pages/juegos/mayor-menor/mayor-menor.component').then((m) => m.MayorMenorComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  }
];

