import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'principal',
        children: [
          {
            path: '',
            loadChildren: () => import('../contenido-app/principal/principal.module').then( m => m.PrincipalPageModule)
          },
          {
            path: 'lindas',
            loadChildren: () => import('../contenido-app/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
          },
          {
            path: 'feas',
            loadChildren: () => import('../contenido-app/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
          },
        ]
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('../contenido-app/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
      },
      {
        path: 'misposts',
        loadChildren: () => import('../contenido-app/posts-usuario/posts-usuario.module').then( m => m.PostsUsuarioPageModule)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/principal'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
