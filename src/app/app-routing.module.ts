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
    redirectTo: 'main/colores'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
    // component: MainPage,
    // children: [
    //   {
    //     path: '',
    //   },
    //   {
    //     path: 'colores',
    //     loadChildren: () => import('./contenido-app/colores/colores.module').then( m => m.ColoresPageModule)
    //   },
    //   {
    //     path: 'animales',
    //     loadChildren: () => import('./contenido-app/animales/animales.module').then( m => m.AnimalesPageModule)
    //   },
    //   {
    //     path: 'numeros',
    //     loadChildren: () => import('./contenido-app/numeros/numeros.module').then( m => m.NumerosPageModule)
    //   }
    // ]
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
