import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-politica-privacidade',
  templateUrl: 'politica-privacidade.html',
})
export class PoliticaPrivacidadePage {

  constructor(public viewCtrl: ViewController) {
  }

  AceitarPrivacidade() {  
    let aceitou = "S";   
    this.viewCtrl.dismiss(aceitou);
  }

}
