import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { userLoggedGuard } from './guards/user-logged.guard';
import { MainPage } from './main/main.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'main',
    redirectTo: 'main/boton-alarma'
  },
  {
    path: 'main',
    component: MainPage,
    canActivateChild: [userLoggedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule )
      },
      {
        path: 'boton-alarma',
        children: [
          {
            path: '',
            outlet: 'contenido-app',
            loadChildren: () => import('./contenido-app/boton-alarma/boton-alarma.module').then( m => m.BotonAlarmaPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'splash'
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
