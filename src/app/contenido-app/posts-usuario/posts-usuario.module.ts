import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsUsuarioPageRoutingModule } from './posts-usuario-routing.module';

import { PostsUsuarioPage } from './posts-usuario.page';
import { ListadoPosteosComponent } from 'src/app/comp/listado-posteos/listado-posteos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPosteosComponent,
    PostsUsuarioPageRoutingModule
  ],
  declarations: [PostsUsuarioPage]
})
export class PostsUsuarioPageModule {}
