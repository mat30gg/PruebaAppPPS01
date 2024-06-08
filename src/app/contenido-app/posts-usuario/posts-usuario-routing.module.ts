import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsUsuarioPage } from './posts-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PostsUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsUsuarioPageRoutingModule {}
