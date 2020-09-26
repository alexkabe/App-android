import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'toast.component',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
})
export class ToastExample {

  constructor(public toastController: ToastController) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Synchonisation reussite!',
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Synchonisation reussite!',
      position: 'top'
    });
    toast.present();
  }

}