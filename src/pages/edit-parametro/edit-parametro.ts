import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ParametroServicoProvider } from '../../providers/parametro-servico/parametro-servico';
import { Setting } from '../../modelo/setting';

@IonicPage()
@Component({
  selector: 'page-edit-parametro',
  templateUrl: 'edit-parametro.html',
})
export class EditParametroPage {

  model : Setting;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private parametroProvider: ParametroServicoProvider,
              private toast: ToastController ) {

    this.model = new Setting();

    if (this.navParams.data.id) {
      this.parametroProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  ionViewDidLoad() { }

  save() {
    this.saveParametro()
      .then(() => {
        this.toast.create({ message: 'Parâmetro salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar parâmetro.', duration: 3000, position: 'botton' }).present();
            });
  }

  private saveParametro() {
    if (this.model.id) {
      return this.parametroProvider.update(this.model);
    } else {
      return this.parametroProvider.insert(this.model);
    }
  }

}
