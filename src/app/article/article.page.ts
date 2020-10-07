import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DBStorage } from '../services/database.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  listeChange: BehaviorSubject<any>;
  temp = false;
  article: any = [];
  articleChoisi = [];
  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              private db: DBStorage)
  {
    this.article = this.db.articles;
    this.listeChange = new BehaviorSubject({});

  }

  ngOnInit() {
  }

  async listeArticle(choix)
  {
    const alert = await this.alertController.create({
      header: 'Quantite',
      message: 'Entrez la quantite voulue.',
      inputs: [
        {
          name: 'quantite',
          placeholder: 'Quantite',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (alertData) => {
              if (alertData.quantite)
              {
                const i = alertData.quantite;
                this.verif(i, choix).then(tar => {
                this.temp = tar;
                this.alertController.dismiss({bac: i});
                });
              }
          }
        }
      ]
    });

    await alert.present();
    const tab = await alert.onWillDismiss();
    const choix2: any = {};
    choix2.code = choix.code;
    choix2.produit = choix.noma;
    choix2.quantite = tab.data.values.quantite;
    choix2.prix = choix.prix;
    choix2.total = choix2.quantite * choix2.prix;
    if (this.temp)
    {
      this.modalCtrl.dismiss({base: choix2});
    }
  }

  async verif(i, choix)
  {
    if (i  < choix.quantite + 1 && i > 0)
            {
              return true;
            }
            else
            {
              this.alertController.create({
                header: 'Desole!',
                message: 'La quantite choisie est superieure a la quantite en stock ou invalide!',
                buttons: ['Ok']
                }).then(alert => alert.present());
              return false;
            }
  }

  // listeneur()
  // {
  //   this.articleChoisi = this.db.articleChoisi;
  //   for (var i = 0; i < this.article.length; i++)
  //   {
  //     for (let choix of this.articleChoisi)
  //     {
  //       if (this.article[i].code === choix.code)
  //       {
  //         this.article.splice(i, 1);
  //       }
  //     }
  //   }
  // }
}
