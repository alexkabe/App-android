import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  users: any = [];
  user: any = {};
  mdp = '';
  constructor(private navigate: NavController,
              private alertController: AlertController,
              private storage: Storage) {
    this.storage.get('User').then(val => {
      this.user = val;
    });
    this.storage.get('Users').then(val => {
      this.users = val;
    });

  }

  ngOnInit() {
  }

  back() {
    this.navigate.navigateRoot(['parametre']);
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notification',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async openAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change the password',
      inputs: [
        {
          name: 'name',
          type: 'password',
          placeholder: 'New passeword',
          cssClass: 'specialClass',
          attributes: {
            minlength: 6,
            maxlength: 15,
            inputmode: 'decimal'
          }
        },
        {
          name: 'rename',
          type: 'password',
          placeholder: 'Rewrite passeword',
          cssClass: 'specialClass',
          attributes: {
            minlength: 6,
            maxlength: 15,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if (alertData.name === alertData.rename) {
              this.changeP(alertData);
              this.alertController.dismiss({ bac: alertData });
              this.presentAlert('Mot de passe change avec succes!');
            }

            else {
              this.presentAlert('Mot de passe non simillaire');
            }
          }
        }
      ]
    });

    await alert.present();

    const tab = await alert.onWillDismiss();

    if (tab.data) {
      this.mdp = tab.data.values.name;
    }
  }

  changeP(alertData) {
    let a = 0;
    console.log(alertData);
    this.user.password = alertData.name;
    this.storage.set('User', this.user);

    for (let i = 0; i < this.users; i++) {
      if (this.users[i] === this.user.id) {
        this.storage.remove('Users');
        a = i;
      }
    }
    this.users[a] = this.user;
    this.storage.set('Users', this.users);

  }


  onSubmit(form) {
    let a = 0;

    this.user.mail = form.value.mail;
    this.user.adresse = form.value.adresse;
    this.user.telephone = form.value.tel;
    this.user.password = this.mdp;
    this.storage.set('User', this.user);

    for (let i = 0; i < this.users; i++) {
      if (this.users[i] === this.user.id) {
        this.storage.remove('Users');
        a = i;
      }
    }
    this.users[a] = this.user;
    this.storage.set('Users', this.users);
    console.log('Effectuer');
    this.presentAlert('Modification effectue avec succes!');
    form.reset();
  }

  async profil() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mon Profil',
      message: 'Nom: ' + this.user.nom + '<br>' + '<br>' +
        ' Prenom: ' + this.user.prenom + '<br>' + '<br>' +
        'Mail: ' + this.user.mail + '<br>' + '<br>' +
        'Pseudo: ' + this.user.pseudo + '<br>' + '<br>' +
        ' Mot de passe: ' + this.user.password + '<br>' + '<br>' +
        'Telephone: ' + this.user.telephone + '<br>' + '<br>' +
        'Adresse: ' + this.user.adresse,
      buttons: ['OK']
    });

    await alert.present();
  }
}
