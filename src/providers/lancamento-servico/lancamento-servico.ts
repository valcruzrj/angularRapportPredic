import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Lancamento } from '../../modelo/lancamento';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class LancamentoServicoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(lancamento: Lancamento) {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql  = 'insert into lancamento (qtdPublicacao, qtdHora, qtdMinuto, qtdVideo, qtdRevisita, qtdCredito, obs, qtdEstudo, dataAtividade) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [lancamento.qtdPublicacao, lancamento.qtdHora, lancamento.qtdMinuto, lancamento.qtdVideo, lancamento.qtdRevisita, lancamento.qtdCredito, lancamento.obs, lancamento.qtdEstudo, lancamento.dataAtividade];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e)); 
  }

  public update(lancamento: Lancamento) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update lancamento set qtdPublicacao = ?, qtdHora = ?, qtdMinuto = ?, qtdVideo = ?, qtdRevisita = ?, qtdCredito = ?, obs = ?, qtdEstudo = ?, dataAtividade = ? where id = ?';
        let data = [lancamento.qtdPublicacao, lancamento.qtdHora, lancamento.qtdMinuto, lancamento.qtdVideo, lancamento.qtdRevisita, lancamento.qtdCredito, lancamento.obs, lancamento.qtdEstudo, lancamento.dataAtividade, lancamento.id];

        return db.executeSql(sql, data)
          .catch((e) => console.log('Erro ao atualizar: ', e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from lancamento where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from lancamento where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let lancamento = new Lancamento();
              lancamento.id            = item.id;
              lancamento.qtdPublicacao = item.qtdPublicacao;
              lancamento.qtdHora       = item.qtdHora;
              lancamento.qtdVideo      = item.qtdVideo;
              lancamento.qtdRevisita   = item.qtdRevisita;
              lancamento.qtdEstudo     = item.qtdEstudo;
              lancamento.dataAtividade = item.dataAtividade;
              lancamento.qtdCredito    = item.qtdCredito;
              lancamento.qtdMinuto     = item.qtdMinuto;
              lancamento.obs           = item.obs;

              return lancamento;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(dataInicial, dataFinal) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = `SELECT * FROM lancamento 
                  WHERE lancamento.dataAtividade >= ? and lancamento.dataAtividade <= ?  
                  ORDER BY lancamento.dataAtividade `;
        let data = [dataInicial, dataFinal];

        return db.executeSql(sql, data)
          .then((data: any) => {

            if (data.rows.length > 0) {
              let lancamentos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var lancamento = data.rows.item(i);
                lancamentos.push(lancamento); 
              }
              return lancamentos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
