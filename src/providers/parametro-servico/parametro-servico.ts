import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Setting } from '../../modelo/setting';

@Injectable()
export class ParametroServicoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

    public getAll() {
      return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT Setting.*, 0 as horasRestantes, 0 as mediaHoras FROM Setting ';

        var data: any[] = [];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let parametros: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var parametro = data.rows.item(i);
                parametros.push(parametro);
              }
              return parametros; 
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Setting where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let parametro = new Setting();
              parametro.id              = item.id;
              parametro.emailSecretario = item.emailSecretario;
              parametro.meuEmail        = item.meuEmail;
              parametro.metaHoras       = item.metaHoras;
              parametro.pioneiro        = item.pioneiro;
              parametro.copiaEmail      = item.copiaEmail;
              parametro.publicador      = item.publicador;
              parametro.aceitaPP        = item.aceitaPP;
              parametro.estudo          = item.estudo;

              return parametro;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  
    public insert(parametro: Setting) {
    return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql  = 'insert into Setting (emailSecretario, meuEmail, metaHoras) values (?,?,?)';
          let data = [parametro.emailSecretario, parametro.meuEmail, parametro.metaHoras];
  
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  
    public update(parametro: Setting) { 
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update Setting set emailSecretario = ?, meuEmail = ?, metaHoras = ?, estudo = ?, pioneiro = ?, copiaEmail = ?, publicador = ? where id = ?';
          let data = [parametro.emailSecretario, parametro.meuEmail, parametro.metaHoras, parametro.estudo, parametro.pioneiro ? 1 : 0, parametro.copiaEmail ? 1 : 0, parametro.publicador,  parametro.id];
  
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e)); 
    }
  
    public atualizaPolitica(id:number, aceitaPolitica: string) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update Setting set aceitaPP = ? where id = ?';
          let data = [aceitaPolitica,  id];
  
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
    

}
