import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLancamentoPage } from './edit-lancamento';

@NgModule({
  declarations: [
    EditLancamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLancamentoPage),
  ],
  exports: [
    ]
    
})
export class EditLancamentoPageModule {}
