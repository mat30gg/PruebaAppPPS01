import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasFeasPageRoutingModule } from './cosas-feas-routing.module';

import { CosasFeasPage } from './cosas-feas.page';
import { FavoritousuarioDirective } from 'src/app/directivas/favoritousuario.directive';
import { ListadoPosteosComponent } from 'src/app/comp/listado-posteos/listado-posteos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasFeasPageRoutingModule,
    FavoritousuarioDirective,
    ListadoPosteosComponent
  ],
  declarations: [CosasFeasPage]
})
export class CosasFeasPageModule {}
