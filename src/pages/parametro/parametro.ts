import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { ParametroServicoProvider } from '../../providers/parametro-servico/parametro-servico';
import { PoliticaPrivacidadePage } from './../politica-privacidade/politica-privacidade';

@IonicPage()
@Component({
  selector: 'page-parametro',
  templateUrl: 'parametro.html',
})
export class ParametroPage {

  parametros: any[] = [];

  aceitou : string;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private parametroProvider: ParametroServicoProvider) {
      this.getParametro();  
  }

  ionViewWillLeave() {
    this.getParametro();
  }

  ionViewDidEnter() {
    this.getParametro();
  }
  
  getParametro() {
    this.parametroProvider.getAll()
    .then((result: any) => {
      this.parametros = result;
    });
  }

  editParametro(id: number) { 
    this.openModal();   
    this.navCtrl.push('EditParametroPage', {id: id});
  }

  openModal() 
  {   
    if ((this.parametros[0].aceitaPP == '') || (this.parametros[0].aceitaPP == null))
    {
      let myModal = this.modalCtrl.create('PoliticaPrivacidadePage');
      myModal.onDidDismiss(data => {
      this.aceitou = data;
      this.parametroProvider.atualizaPolitica( this.parametros[0].id, this.aceitou );

      });
      myModal.present();
    }
  }

}
