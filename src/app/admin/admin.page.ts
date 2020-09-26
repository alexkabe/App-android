import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  client = {
    code: String,
    nom: String,
    prenom: String,
    pseudo: String,
    password: String
  };
  article = {
    code: String,
    nom: String,
    prix: Number,
    quantite: Number
  };
  constructor() { }

  ngOnInit() {
  }

  addClient(client: NgForm)
  {
    this.client.code = client.value.code;
    this.client.nom = client.value.nom;
    this.client.prenom = client.value.prenom;
    this.client.pseudo = client.value.pseudo;
    this.client.password = client.value.password;

    this.client = Object.assign(this.client, client.value);
    let tabClient = [];
    if (localStorage.getItem('Client'))
        {
            tabClient = JSON.parse(localStorage.getItem('Client'));
            tabClient = [this.client, ...tabClient];
        }
    else
        {
            tabClient = [this.client];
        }

    localStorage.setItem('Client', JSON.stringify(tabClient));
    client.reset();
  }

  addArticle(article: NgForm)
  {
      this.article.code = article.value.code;
      this.article.nom = article.value.nom;
      this.article.prix = article.value.prix;
      this.article.quantite = article.value.quantite;

      this.article = Object.assign(this.article, article.value);
      let tabArticle = [];
      if (localStorage.getItem('Article'))
          {
              tabArticle = JSON.parse(localStorage.getItem('Article'));
              tabArticle = [this.article, ...tabArticle];
          }
      else
          {
              tabArticle = [this.article];
          }

      localStorage.setItem('Article', JSON.stringify(tabArticle));
      article.reset();
  }

}
