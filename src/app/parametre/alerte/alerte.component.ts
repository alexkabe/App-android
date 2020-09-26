import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'alerte.component',
  templateUrl: 'alerte.component.html',
  styleUrls: ['./alerte.component.scss'],
})
export class AlerteExample {

  constructor(public alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change the password',
      inputs: [
        {
          name: 'name8',
          type: 'text',
          placeholder: 'New passeword',
          cssClass: 'specialClass',
          attributes: {
            minlength: 6,
            maxlength: 15,
            inputmode: 'decimal'
          }
        },
        {
          name: 'name8',
          type: 'text',
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
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}