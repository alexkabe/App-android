import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { DBStorage } from './database.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class TabService
{

  private database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  client = new BehaviorSubject([]);

  constructor(  private platform: Platform,
                private sqliteporter: SQLitePorter,
                private sqlite: SQLite,
                private http: HttpClient
            )
    {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() =>  {
            console.log('Debut base de donnees');
            this.sqlite.create({
                name: 'magasin',
                location: 'default'
        }).then((db: SQLiteObject) => {
        console.log('Entree');
        this.database = db;
        this.setDatabase();
        });
    });
  }
  setDatabase()
  {
          this.http.get('assets/magasin.sql', {responseType: 'text'}).subscribe(sql => {
          this.sqliteporter.importSqlToDb(this.database, sql).then(_ => {
          this.getAllClient();
          //this.getAllArticle();
          this.databaseReady.next(true);
          }
      ).catch(e => console.log(e));
      });
  }

  getDatabase()
  {
      return this.databaseReady.asObservable();
  }
  getClient(){
      return this.client.asObservable();
  }


  getAllClient()
    {
        return this.database.executeSql('SELECT * FROM client', []).then(data => {
        let  client = [];
        if (data.rows.length > 0){
        for ( let i = 0; i < data.rows.length; i++)
            {
                client.push({
                code: data.rows.item(i).code,
                nom: data.rows.item(i).nom,
                prenom: data.rows.item(i).prenom,
                psa: data.rows.item(i).psa,
                } );
            }
        }
        this.client.next(client);
        }, err => {
        console.log('Error:', err);
        return [];
        });
    }

    // getAllArticle()
    // {
    //     return this.database.executeSql('SELECT * FROM article', []).then(data => {
    //     let  article = [];
    //     if (data.rows.length > 0){
    //     for ( var i = 0; i < data.rows.length; i++)
    //         {
    //             article.push({
    //             code: data.rows.item(i).code,
    //             quantite: data.rows.item(i).quantite,
    //             noma: data.rows.item(i).noma,
    //             prix: data.rows.item(i).prix
    //             } );
    //         }
    //     }
    //     return article;
    //     }, err => {
    //         console.log('Error:', err);
    //         return [];
    //     });
    // }


    // addClient(code, nom, prenom, psa)
    // {
    //     let data = [code, nom, prenom, psa];
    //     this.database.executeSql('INSERT INTO client (code, nom, prenom, psa) VALUES(?, ?, ?, ?)', data).then(res => {
    //     return res;
    //     });
    // }

    // addArticle(code, noma, prix, quantite)
    // {
    //     let data = [code, noma, prix, quantite];
    //     this.database.executeSql('INSERT INTO article (code, noma, prix, quantite) VALUES(?, ?, ?, ?)', data).then(res => {
    //     return res;
    //     });
    // }

}