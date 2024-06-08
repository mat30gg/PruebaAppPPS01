import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'colores',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'colores',
        loadChildren: () => import('../contenido-app/colores/colores.module').then( m => m.ColoresPageModule)
      },
      {
        path: 'animales',
        loadChildren: () => import('../contenido-app/animales/animales.module').then( m => m.AnimalesPageModule)
      },
      {
        path: 'numeros',
        loadChildren: () => import('../contenido-app/numeros/numeros.module').then( m => m.NumerosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
