import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
import { DBStorage } from '../services/database.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  facture = [];
  utilisateur = {
    pseudo: String,
    password: String,
    statut: Boolean
  };
  constructor(private modalController: ModalController,
              private navigate: NavController,
              private route: ActivatedRoute,
              private dBStorage: DBStorage,
              private alertController: AlertController)
  {
    this.dBStorage.factureonChange.subscribe(val => {
      this.facture = val;
    });
    this.facture = this.dBStorage.tabFact;
    this.route.queryParams.subscribe(params => {
      this.utilisateur = params.state;
    });
  }

  ngOnInit()
  {
  }

  async openModal()
  {
    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: 'modal'
    });
    await modal.present();
  }

    dropFact(i)
    {
      console.log(i);
      this.confirmation(i);

    }

    back()
    {
      this.navigate.navigateBack('homepage');
    }

    details(fact)
    {
      this.alertController.create({
        header: fact.client.nom + ' ' + fact.client.prenom ,
        message: 'Total HT: ' + fact.total  + ' FCFA <br><br>' +
        'Total TVA: ' + fact.tva + ' FCFA<br><br>' +
        'Total PSA: ' + fact.psa + ' FCFA<br><br>' +
        'Total Taxes: ' + fact.ttt + ' FCFA<br><br>' +
        'Solde: ' + fact.solde + ' FCFA<br><br>',
        buttons: ['Ok']
        }).then(alert => alert.present());
    }

    async confirmation(i)
    {
      let alert = await this.alertController.create({
        message: 'Voulez vous supprimer cette facture?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => { }
          },
          {
            text: 'Oui',
            handler: () => {
              this.dBStorage.dropFact(i);
            }
          },
        ]
      });
      alert.present();
    }
}
