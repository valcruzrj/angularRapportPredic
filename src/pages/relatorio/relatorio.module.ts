import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { RelatorioPage } from './relatorio';

@IonicPage()
@NgModule({
  declarations: [
    RelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatorioPage),
  ],
  exports: [
    ],
})
export class RelatorioPageModule {}
