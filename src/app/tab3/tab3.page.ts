import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ClientPage } from '../client/client.page';
import { ArticlePage } from '../article/article.page';
import { Popover2Component } from '../popover2/popover2.component';
import { ActivatedRoute } from '@angular/router';
import { DBStorage } from '../services/database.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {

  sup: boolean;
  articles: any = [];
  articleChoisi = [];
  clients: any = [];
  numtest: number = 0;
  numClient: number;
  numero = 0;
  numliste: number;
  unite: number = 0;

  solde: number = 0;
  ttt: number = 0;
  total: number = 0;
  total2: number = 0;
  psa: number = 0;
  tva: number = 0;
  public numFooter: number;

  data: any;
  constructor(private modalController: ModalController,
              private alertController: AlertController,
              private navigation: NavController,
              private route: ActivatedRoute,
              private popover2: Popover2Component,
              private db: DBStorage)
  {
    this.articleChoisi = [];
    this.numliste = 0;
    this.numClient = null;

    this.clients = this.db.clients;
    this.articles = this.db.articles;

    this.db.supprime.subscribe(val => {
      this.sup = val;
      this.dropFacture();
    });

    this.route.queryParams.subscribe( params => {
      if (params && params.special) {
        this.data = params.special;
      }
    });

  }
  ngOnInit()
  {

  }


  async openClient()
  {
    if (this.db.numliste === 0)
    {
      const modalClient = await this.modalController.create({
        component: ClientPage,
        cssClass: 'modal'
      });
      await modalClient.present();
      const tabCli = await modalClient.onWillDismiss();
      if (tabCli.data != null)
      {
        this.numClient = tabCli.data;
        this.numtest = 1;
        this.numero =  1;
        this.db.verif = true;
      }
    }
  }
  async onClose()
  {

    if (this.db.verif === true)
    {
      let alert = await this.alertController.create({
        message: 'Voulez vous quitter sans enregistrer?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => { }
          },
          {
            text: 'Oui',
            handler: () => {
              this.navigation.navigateBack(['homepage']);
              this.articleChoisi = [];
              this.db.numliste = 0;
              this.numClient = 0;
              this.numtest = 0;
              this.numero = 0;
              this.db.articleChoisi = [];
              this.ttt = 0;
              this.tva = 0;
              this.solde = 0;
              this.total = 0;
              this.psa = 0;

            }
          }
        ]
      });
      alert.present();
    }
    else
    {
      this.navigation.navigateBack(['homepage']);
      this.articleChoisi = [];
      this.db.numliste = 0;
      this.numClient = 0;
      this.numtest = 0;
      this.numero = 0;
      this.db.articleChoisi = [];

      this.ttt = 0;
      this.tva = 0;
      this.solde = 0;
      this.total = 0;
      this.psa = 0;

    }
  }

    async openArticle()
    {
      const modalArticle = await this.modalController.create({
        component: ArticlePage,
        cssClass: 'modal'
      });
      await modalArticle.present();
      const tabArt = await modalArticle.onWillDismiss();
      if (tabArt.data)
      {

        if (this.articleChoisi.length !== 0)
        {
          for (let art of this.articleChoisi)
          {
            if (art.code === tabArt.data.base.code)
            {
              art.quantite = tabArt.data.base.quantite;
            }
            else
            {
              this.articleChoisi = [tabArt.data.base, ...this.articleChoisi];
            }
          }
        }
        else
        {
          this.articleChoisi = [tabArt.data.base];
        }

        this.db.articleChoisi = this.articleChoisi;
        this.calcul();
        this.db.verif = true;
      }
    }

    calcul()
    {
      if (this.articleChoisi.length !== 0)
      {
        this.total = 0;
        for (let art of this.articleChoisi)
        {
          let atx = parseInt(art.prix) * parseInt(art.quantite);
          this.total2 = this.total2 + atx;
          this.unite = this.unite + parseInt(art.quantite);
        }
        this.total = this.total + this.total2;
        this.total2 = 0;
        this.tva = (this.total * 19.25) / 100;
        let psaclient = this.clients[this.numClient].psa;
        this.psa = (this.total * psaclient) / 100;
        this.ttt = this.psa + this.tva;
        this.solde = this.total + this.ttt;

      }
      else
      {
        this.tva = 0;
        this.ttt = 0;
        this.psa = 0;
        this.solde = 0;
        this.total = 0;
      }
    }
    ouverture(ev: any)
    {
      this.popover2.presentPopover(ev);
      this.db.facture.client = this.clients[this.numClient];
      this.db.facture.article = this.articleChoisi;

      this.db.facture.solde = this.solde;
      this.db.facture.psa = this.psa;
      this.db.facture.total = this.total;
      this.db.facture.ttt = this.ttt;
      this.db.facture.tva = this.tva;
    }

    dropArticle(i)
    {
      this.confirmation(i);
    }


    async confirmation(i)
    {
      let alert = await this.alertController.create({
        message: 'Voulez vous supprimer cet article?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => { }
          },
          {
            text: 'Oui',
            handler: () => {
              this.db.verif = true;
              this.articleChoisi.splice(i, 1);
              this.calcul();
            }
          },
        ]
      });
      alert.present();
    }

    dropFacture()
    {
      this.articleChoisi = [];
      this.db.numliste = 0;
      this.numClient = 0;
      this.numtest = 0;
      this.numero = 0;
      this.db.articleChoisi = [];

      this.ttt = 0;
      this.tva = 0;
      this.solde = 0;
      this.total = 0;
      this.psa = 0;
    }

}
