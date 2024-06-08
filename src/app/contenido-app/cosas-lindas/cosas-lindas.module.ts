import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasLindasPageRoutingModule } from './cosas-lindas-routing.module';

import { CosasLindasPage } from './cosas-lindas.page';
import { FavoritousuarioDirective } from 'src/app/directivas/favoritousuario.directive';
import { ListadoPosteosComponent } from 'src/app/comp/listado-posteos/listado-posteos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritousuarioDirective,
    CosasLindasPageRoutingModule,
    ListadoPosteosComponent
  ],
  declarations: [
    CosasLindasPage
  ]
})
export class CosasLindasPageModule {}
