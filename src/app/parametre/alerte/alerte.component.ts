import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'alerte.component',
  templateUrl: 'alerte.component.html',
  styleUrls: ['./alerte.component.scss'],
})
export class AlerteExample {

  constructor(public alertController: AlertController) {}

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message,
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
          name: 'name',
          type: 'text',
          placeholder: 'New password',
          cssClass: 'specialClass',
          attributes: {
            minlength: 6,
            maxlength: 15,
            inputmode: 'decimal'
          }
        },
        {
          name: 'rename',
          type: 'text',
          placeholder: 'Rewrite password',
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
            if (alertData.name === alertData.rename)
            {
              this.alertController.dismiss({'bac': alertData.name});
            }
            else
            {
              this.presentAlert('Mot de passe incompatible');
            }
          }
        }
      ]
    });

    await alert.present();
  }

}