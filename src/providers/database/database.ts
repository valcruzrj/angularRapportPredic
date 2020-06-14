import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject  } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /* Cria um banco caso não exista ou pega um banco existente com o nome no parametro */

  public getDB() {
    return this.sqlite.create({ 
      name: 'rapport18.db',
      location: 'default' 
    });
  }

  /* Cria a estrutura inicial do banco de dados */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        
        // Criando as tabelas
        this.createTables(db);

        // Inserindo Parametros
        this.insertParametros(db);
        
      })
      .catch(e => console.log(e));
  }

  /* Criando as tabelas no banco de dados @param db */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE Setting (id integer primary key AUTOINCREMENT NOT NULL, meuEmail TEXT, aceitaPP TEXT, emailSecretario TEXT, metaHoras integer, pioneiro integer, estudo integer, copiaEmail integer, publicador TEXT)'],
      ['CREATE TABLE lancamento (id integer primary key AUTOINCREMENT NOT NULL, qtdPublicacao integer, qtdHora integer, qtdMinuto integer, obs TEXT, qtdVideo integer, qtdRevisita integer, qtdCredito integer, qtdEstudo integer, dataAtividade TEXT )']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertParametros(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from Setting', {})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
        // Criando as tabelas
        db.sqlBatch([
          ['insert into Setting (meuEmail, emailSecretario, aceitaPP, metaHoras, pioneiro, copiaEmail, publicador) values (?,?,?,?,?,?,?)', ['','','',0,0,1,'']]
        ])
          .then(() => console.log('Dados setting incluídos'))
          .catch(e => console.error('Erro ao incluir dados setting', e)); 
      }
    }) 
    .catch(e => console.error('Erro ao consultar a qtd de setting', e));
  }
}
