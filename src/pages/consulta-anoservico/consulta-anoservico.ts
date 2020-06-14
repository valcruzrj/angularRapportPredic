import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { RelatorioServicoProvider } from '../../providers/relatorio-servico/relatorio-servico';
import { ParametroServicoProvider } from '../../providers/parametro-servico/parametro-servico';

@IonicPage()
@Component({
  selector: 'page-consulta-anoservico',
  templateUrl: 'consulta-anoservico.html',
})
export class ConsultaAnoservicoPage {

  dadosAnoServico: any[] = [];
  parametros: any[] = [];

  dataInicial;
  dataFinal;
  initialDate;
  finalDate;

  totalMin;
  totalHor;  

  barChartOptions: any = [{
    scales: {
       yAxes: [
        {
            display: true,
            ticks: {
              fontSize: 10,
              colors: '#fff'
            }
        }
      ]
    }
  }];

  barChartLabels = [];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;
  barChartData:any;
  barChartColors:Array<any> = [
    {
      backgroundColor: '#3F51B5',
      borderColor: '#3F51B5',
      pointBackgroundColor: '#3F51B5',
      pointBorderColor: '#3F51B5',
      pointHoverBackgroundColor: '#3F51B5',
      pointHoverBorderColor: '#3F51B5',
      labels: '#3F51B5'
    }]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private relatorioProvider: RelatorioServicoProvider,
              private parametroProvider: ParametroServicoProvider,
              private _datePicker: DatePicker ) 
          {
            this.initialDate =  new Date();
            this.finalDate =  new Date();
            this.defineDatas();
          }            

  ionViewDidLoad() {
  }

  selecionaDataInicial() {
    this._datePicker.show({
        date: this.initialDate, 
        mode: 'date',
        androidTheme: this._datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    })
    .then(
      date => this.dataInicial = date.toISOString(),
      err => console.log('Erro ao obter Data: ', err)
    );
  }

  selecionaDataFinal() {
    this._datePicker.show({
        date: this.finalDate,
        mode: 'date',
        androidTheme: this._datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    })
    .then(
      date => this.dataFinal = date.toISOString(),
      err => console.log('Erro ao obter Data: ', err)
    );
  }

  defineDatas() {
    let inicio = '00';
    let dia = '01';
    let ano = this.initialDate.getFullYear();
    let mes = '09';
    let mesAtual = (inicio + ( this.initialDate.getMonth() + 1)).slice(-inicio.length);

    if (parseInt(mesAtual)  < 9)  {
     ano = ano - 1;
    }

    this.dataInicial = ano + '-' + mes + '-' + dia + 'T00:00:00.000Z';
    this.finalDate = new Date();
    this.dataFinal = new Date().toISOString();
    
  }

  consultaAnoServico() { 
    var usrDate = new Date(this.dataInicial);
    var curDate = new Date(this.dataFinal);
    var usrYear, usrMonth = usrDate.getMonth()+1;
    var curYear, curMonth = curDate.getMonth()+1;
    if((usrYear=usrDate.getFullYear()) < (curYear=curDate.getFullYear())){
        curMonth += (curYear - usrYear) * 12;
    }
    var diffMonths = curMonth - usrMonth + 1;
    if(usrDate.getDate() > curDate.getDate()) 
      { diffMonths--; }

    this.relatorioProvider.totalizaMes(this.dataInicial, this.dataFinal)
    .then((result: any[]) => {
      this.dadosAnoServico = result;

      if ((this.dadosAnoServico[0].qtdMinuto != null) && (this.dadosAnoServico[0].qtdMinuto > 59))
      {      
        this.calculaHoras(this.dadosAnoServico[0].qtdMinuto);
        this.dadosAnoServico[0].qtdHora += this.totalHor; 
        this.dadosAnoServico[0].qtdMinuto = this.totalMin; 
      }

      });

    this.parametroProvider.getAll()
      .then((result: any) => {
        this.parametros = result;  
        this.dadosAnoServico[0].mediaHoras = this.dadosAnoServico[0].qtdHora / diffMonths;
        if ((this.parametros[0].metaHoras > 0 ) &&  (this.parametros[0].pioneiro == 1) )
        { this.dadosAnoServico[0].horasRestantes =  (this.parametros[0].metaHoras * 12) - this.dadosAnoServico[0].qtdHora; }
        else
        { this.dadosAnoServico[0].horasRestantes =  ' - '; }
      });

      // implementação futura
      //    this.calcbar();
  }
  
  calcbar(){  
    let mes1=65;
    let mes2=47;
    let mes3=83;
    let mes4=29;
    let mes5=69;
    let mes6=25; 

    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011'];      
    this.barChartData = [
  	  {data: [mes1,mes2,mes3,mes4,mes5,mes6], label: 'Horas no mes'},
    	  {data: [28, 48, 40, 19, 86, 27], label: 'Meta'}
    ];
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
