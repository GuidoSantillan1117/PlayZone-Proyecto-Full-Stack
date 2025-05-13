import { Routes } from '@angular/router';
import { loginGuard } from './login.guard';
import { registerGuard } from './register.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    title:"Inicio",
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    title:"Sobre mi",
    path: 'bio',
    loadComponent: () =>
      import('./pages/bio/bio.component').then((m) => m.BioComponent),
      canActivate: [loginGuard]
  },
  {
    title:"Ingresar",
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
      canActivate: [registerGuard]
  },
  {
    title:"Registrarse",
    path: 'register',
    loadComponent: () =>
    import('./pages/register/register.component').then((m) => m.RegisterComponent),
     canActivate: [registerGuard]


  }
  ,
  {
    title:"JUEGO | Ahorcado",
    path: 'ahorcado',
    loadComponent: () =>
      import('./pages/juegos/ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
      canActivate: [loginGuard]
  },
  {
    title:"JUEGO | Mayor o Menor",
    path: 'mayor-menor',
    loadComponent: () =>
      import('./pages/juegos/mayor-menor/mayor-menor.component').then((m) => m.MayorMenorComponent),
      canActivate: [loginGuard]
  },
  {
    title:"JUEGO | Bomb it!",
    path: 'bomb-it',
    loadComponent: () =>
      import('./pages/juegos/bombit/bombit.component').then((m) => m.BombitComponent),
      canActivate: [loginGuard]
  },
  {
    title:"JUEGO | Preguntados",
    path: 'preguntados',
    loadComponent: () =>
      import('./pages/juegos/preguntados/preguntados.component').then((m) => m.PreguntadosComponent),
    canActivate: [loginGuard]
  },
  
  {
    title:"Ranking",
    path: 'ranking',
    loadComponent: () =>
      import('./pages/ranking/ranking.component').then((m) => m.RankingComponent),
      canActivate: [loginGuard]
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
      canActivate: [loginGuard]
  },
  {
    path: '**', 
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

