import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { ConsultaAnoservicoPage } from './consulta-anoservico';

@IonicPage()
@NgModule({
  declarations: [
    ConsultaAnoservicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaAnoservicoPage),
  ],
})
export class ConsultaAnoservicoPageModule {}
