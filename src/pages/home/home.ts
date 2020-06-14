import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { Lancamento } from '../../modelo/lancamento';
import { LancamentoServicoProvider } from '../../providers/lancamento-servico/lancamento-servico';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lancamentos: any[] = [];

  currentDate;
  dataExibida;

  dataInicial;
  dataFinal;

  parametros: any[] = [];

  constructor(public navCtrl: NavController,  
              private toast: ToastController, 
              private lancamentoProvider: LancamentoServicoProvider
            ) { 
                this.currentDate =  new Date();
                this.dataExibida = this.currentDate;
                this.exibeMesAtual(this.currentDate); 
          }

 ionViewDidEnter() {  this.getAllLancamentos();
  }
                  
  ionViewWillLeave() { 
    this.getAllLancamentos();
  }

  getAllLancamentos() {
    this.lancamentoProvider.getAll(this.dataInicial, this.dataFinal)
    .then((result: any) => {
      this.lancamentos = result;
    });

  }

  addLancamento() {
    this.navCtrl.push('EditLancamentoPage');
  }

  editLancamento(id: number) {
    this.navCtrl.push('EditLancamentoPage', { id: id });
  }

  removeLancamento(lancamento: Lancamento) {
    this.lancamentoProvider.remove(lancamento.id)
      .then(() => {
        var index = this.lancamentos.indexOf(lancamento);
        this.lancamentos.splice(index, 1);
        this.toast.create({ message: 'Atividade removida.', duration: 3000, position: 'botton' }).present();
      })
  }

   exibeMesAtual(data) {
     let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

     let dias = ["31","29","31","30","31","30","31","31","30","31","30","31"];

     let inicio = "00";
     var ano = data.getFullYear();
     var mesexibir = meses[data.getMonth()];        
     let mes = (inicio + ( data.getMonth() + 1)).slice(-inicio.length);

     this.dataExibida = mesexibir + ' ' + ano;

     let dia = (inicio + data.getDate()).slice(-inicio.length); 

     this.dataInicial = ano + '-' + mes + '-01T00:00:00.000Z';
     this.dataFinal   = ano + '-' + mes + '-' + dias[data.getMonth()]  +'T23:59:50.000Z';
   }

   mesAnterior() {
     this.currentDate.setDate(this.currentDate.getDate() - 30);
     this.exibeLancamentos();
    }

   proximoMes() {
     this.currentDate.setDate(this.currentDate.getDate() + 30);
     this.exibeLancamentos();
    }

   exibeLancamentos () {
    this.dataExibida = this.currentDate;
    this.exibeMesAtual(this.currentDate);
    this.getAllLancamentos(); 
   }

}
