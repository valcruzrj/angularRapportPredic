import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { ExibePoliticaPage } from './exibe-politica';

@IonicPage()
@NgModule({
  declarations: [
    ExibePoliticaPage,
  ],
  imports: [
    IonicPageModule.forChild(ExibePoliticaPage),
  ],
})
export class ExibePoliticaPageModule {}
