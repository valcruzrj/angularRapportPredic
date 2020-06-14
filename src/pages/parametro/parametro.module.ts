import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { ParametroPage } from './parametro';

@IonicPage()
@NgModule({
  declarations: [
    ParametroPage,
  ],
  imports: [
    IonicPageModule.forChild(ParametroPage),
  ],
})
export class ParametroPageModule {}
