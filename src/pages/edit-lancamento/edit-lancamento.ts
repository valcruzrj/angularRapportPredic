import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Lancamento } from '../../modelo/lancamento';
import { LancamentoServicoProvider } from '../../providers/lancamento-servico/lancamento-servico';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-edit-lancamento',
  templateUrl: 'edit-lancamento.html',
})
export class EditLancamentoPage {
  model: Lancamento;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private lancamentoProvider: LancamentoServicoProvider,
    private toast: ToastController,
    private _datePicker: DatePicker ) {

    this.model = new Lancamento();

    if (this.navParams.data.id) {
      this.lancamentoProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
    else {
      this.model.dataAtividade = new Date().toISOString();
    }

  }

  ionViewDidLoad() {}

  save() {
    if (this.model.qtdMinuto == null) 
    { this.model.qtdMinuto = 0; }
    this.saveLancamento()
      .then(() => {
        this.toast.create({ message: 'Atividade salva', duration: 2000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a atividade.', duration: 3000, position: 'botton' }).present();
            });
  }

  private saveLancamento() {
    if (this.model.id) {
      return this.lancamentoProvider.update(this.model);
    } else {
      return this.lancamentoProvider.insert(this.model);
    }
  }

  selecionaData() { 
    this._datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this._datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    })
    .then(
      date => this.model.dataAtividade = date.toISOString(),
      err => console.log('Erro ao obter Data: ', err)
    );
  }
}
