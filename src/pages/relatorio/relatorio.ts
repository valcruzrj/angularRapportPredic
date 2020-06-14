import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioServicoProvider } from '../../providers/relatorio-servico/relatorio-servico';
import { EmailComposer } from '@ionic-native/email-composer';
import { ParametroServicoProvider } from '../../providers/parametro-servico/parametro-servico';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  relatorioMes: any[] = [];
  parametros: any[] = [];

  dataExibida;

  dataInicial;
  dataFinal;

  ano;
  mes;
  dia;

  totalMin;
  totalHor;  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private relatorioProvider: RelatorioServicoProvider,
              private emailComposer: EmailComposer,
              private parametroProvider: ParametroServicoProvider
               ) {}

              ionViewDidLoad() {
                this.getParametro();
                this.dateChanged();
              }
            
  getParametro() {
    this.parametroProvider.getAll()
    .then((result: any) => {
      this.parametros = result;  
    });

  }

  totaldoMes() {
    let dias = ["31","29","31","30","31","30","31","31","30","31","30","31"];

    this.dataInicial = this.ano + '-' + ("00" + this.mes).slice(-2) + '-01T00:00:00.000Z';
    this.dataFinal   = this.ano + '-' + ("00" + this.mes).slice(-2) + '-' + dias[parseFloat(this.mes)-1]  +'T23:59:59.000Z';

    this.relatorioProvider.totalizaMes(this.dataInicial, this.dataFinal)
    .then((result: any[]) => {
      this.relatorioMes = result;

      if ((this.relatorioMes[0].qtdMinuto != null) && (this.relatorioMes[0].qtdMinuto > 59))
      {      
        this.calculaHoras(this.relatorioMes[0].qtdMinuto);
        this.relatorioMes[0].qtdHora += this.totalHor; 
        this.relatorioMes[0].qtdMinuto = this.totalMin; 
      }
      
      this.relatorioMes[0].qtdEstudo = this.parametros[0].estudo; 
       
     });

  }
     
  enviarEmail() {
    this.validaDados();

    let mybody : string;
    let obs    : string;

    let toSecretario = this.parametros[0].emailSecretario;
    let ccMe = '';
    if (this.parametros[0].copiaEmail == 1)  
       { ccMe = this.parametros[0].meuEmail }

    let rDe = this.parametros[0].publicador;
    if (this.relatorioMes[0].observacao != '') 
    { obs = 'Observações: ' + this.relatorioMes[0].observacao + '<br/>'; }

    mybody = 
    'Nome: ' + rDe + '<br/>'  + 
    'Mês: ' + this.mes + '/' + this.ano + '<br/>' + 
    '' + '<br/>' + 
    'Publicações: ' +  this.relatorioMes[0].qtdPublicacao + '<br/>' +  
    'Vídeos mostrados: ' + this.relatorioMes[0].qtdVideo + '<br/>' +
    'Horas: ' + this.relatorioMes[0].qtdHora + ':' + this.relatorioMes[0].qtdMinuto + '<br/>' + 
    'Revisitas: ' + this.relatorioMes[0].qtdRevisita + '<br/>' + 
    'Estudos bíblicos: ' + this.relatorioMes[0].qtdEstudo + '<br/>' + 
    obs;

    let email = { 
      to: toSecretario,
      cc: ccMe,
      subject: 'Relatório de Serviço de Campo ' + rDe,
      body:  mybody,
      isHtml: true
    };

    if (toSecretario=='')  
      { alert('Email não enviado. Verifique Configurações!')  } 
    else 
      { this.emailComposer.addAlias('gmail', 'com.google.android.gm');
        this.emailComposer.open(email);
      }
   }

  dateChanged() {
    this.dataExibida = new Date();
    this.ano = this.dataExibida.getFullYear();
    this.mes = this.dataExibida.getMonth() + 1;
    this.totaldoMes(); 
  }

  validaDados() {
    if (this.relatorioMes[0].qtdPublicacao == null ) { this.relatorioMes[0].qtdPublicacao = 0; } ;
    if (this.relatorioMes[0].qtdVideo == null      ) { this.relatorioMes[0].qtdVideo = 0; } ;  
    if (this.relatorioMes[0].qtdHora == null       ) { this.relatorioMes[0].qtdHora = 0; }  ; 
    if (this.relatorioMes[0].qtdMinuto == null     ) { this.relatorioMes[0].qtdMinuto = 0; }  ;
    if (this.relatorioMes[0].qtdRevisita == null   ) { this.relatorioMes[0].qtdRevisita = 0; } ;  
    if (this.relatorioMes[0].qtdEstudo == null     ) { this.relatorioMes[0].qtdEstudo = 0; }  ;

    if (this.relatorioMes[0].qtdCredito == null ) 
    { this.relatorioMes[0].qtdCredito = 0;
      this.relatorioMes[0].observacao = ''; 
    } 
    else
    { this.relatorioMes[0].observacao = 'Crédito de Horas: ' + this.relatorioMes[0].qtdCredito; } ;

    if (this.parametros[0].estudo == null ) { this.parametros[0].estudo = 0; } 

    if ((parseInt(this.relatorioMes[0].qtdEstudo) > 0) && parseInt(this.relatorioMes[0].qtdRevisita) == 0)
     { alert('Verifique. Há estudo relatado sem relatar revisita!')  } 
    else
    if ( parseInt(this.relatorioMes[0].qtdEstudo) > parseInt(this.relatorioMes[0].qtdRevisita) )
     { alert('Verifique. Há divergência entre quantidade de estudos e quantidade de revisitas!')  } 

   }

   calculaHoras (totalMinutos) 
   {      
     this.totalHor = 0;

     while ( totalMinutos >= 60 )
       {
         totalMinutos -= 60;
         this.totalHor++; 
       }
       this.totalMin = totalMinutos;
   }
}
