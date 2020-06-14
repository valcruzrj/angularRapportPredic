import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
  }

  enviarFeedback() {
    let email = {
      to: 'meuemail@gmail.com',
      subject: 'Rapport Feedback ',
      body: ' Versão: 0.0.4  Data: 19/11/2018',
      isHtml: true
    };

      this.emailComposer.addAlias('gmail', 'com.google.android.gm');
      this.emailComposer.open(email);
  }

}
