import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { ParametroPage } from '../pages/parametro/parametro';
import { RelatorioPage } from '../pages/relatorio/relatorio';
import { AboutPage } from './../pages/about/about';
import { ConsultaAnoservicoPage } from './../pages/consulta-anoservico/consulta-anoservico';
import { ExibePoliticaPage } from '../pages/exibe-politica/exibe-politica';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  public pages: Array<{titulo: string, component: any, icon: any}>;

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen, dbProvider: DatabaseProvider)
        {
            this.pages = [
              {titulo: 'Início', component: HomePage, icon:'home'},
              {titulo: 'Atividade diária', component: HomePage, icon:'calendar'},
              {titulo: 'Relatório do Mês', component: 'RelatorioPage', icon:'stats'},
              {titulo: 'Consulta Ano Serviço', component: 'ConsultaAnoservicoPage', icon:'time'},
              {titulo: 'Configurações', component: 'ParametroPage', icon:'settings'},
              {titulo: 'Sobre', component: 'AboutPage', icon:'information-circle'},
              {titulo: 'Política de Privacidade', component: 'ExibePoliticaPage', icon:'information'}
            ];  
            platform.ready().then(() => { 
              statusBar.styleDefault();

              //Criando o banco de dados
              dbProvider.createDatabase()
                .then(() => {
                  // fechando a SplashScreen somente quando o banco for criado
                  this.openHomePage(splashScreen);
                })
                .catch(() => {
                  // ou se houver erro na criação do banco
                  this.openHomePage(splashScreen);
                });
            });
          }

  goToPage(opcao) {
    this.rootPage = opcao;
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = 'HomePage';
  }
}

