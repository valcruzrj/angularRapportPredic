import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class RelatorioServicoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  totalizaMes(dataInicial, dataFinal) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = `SELECT sum(qtdPublicacao) as qtdPublicacao, sum(qtdHora) as qtdHora,
                          sum(qtdVideo) as qtdVideo,           sum(qtdRevisita) as qtdRevisita,
                          sum(qtdEstudo) as qtdEstudo,         sum(qtdCredito) as qtdCredito,
                          sum(qtdMinuto) as qtdMinuto,         ' ' as observacao
                          FROM lancamento 
                          WHERE lancamento.dataAtividade >= ? and lancamento.dataAtividade <= ? `;
        let data = [dataInicial, dataFinal];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let TotalMes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var lancamento = data.rows.item(i);
                TotalMes.push(lancamento); 
              }
              return TotalMes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class TotalMes {
  observacao : string;
  qtdPublicacao: number;
  qtdHora: number;
  qtdVideo: number;
  qtdRevisita: number;
  qtdEstudo: number;
  qtdCredito: string;

}
