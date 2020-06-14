import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { DatePicker } from '@ionic-native/date-picker';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { LancamentoServicoProvider } from '../providers/lancamento-servico/lancamento-servico';
import { DatabaseProvider } from '../providers/database/database';
import { ParametroServicoProvider } from '../providers/parametro-servico/parametro-servico';
import { RelatorioServicoProvider } from '../providers/relatorio-servico/relatorio-servico';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ChartsModule
  ],
  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatePicker,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LancamentoServicoProvider,
    DatabaseProvider,
    ParametroServicoProvider,
    RelatorioServicoProvider
  ]
})
export class AppModule {}
