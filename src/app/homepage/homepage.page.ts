import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { NavController, ToastController } from '@ionic/angular';
import {Storage } from '@ionic/storage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private router: Router,
              private navigate: NavController,
              private network: Network,
              private toastController: ToastController)
  {

  }

  ngOnInit() {
    this.network.onConnect().subscribe(() => {
      this.presentToast();
    });
    this.network.onDisconnect().subscribe(() => {
      this.presentToast2();
    });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vous etes connecter',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Vous etes deconnecter',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

  openChat()
  {
    this.router.navigate(['/chat']);
  }

  logger() {
    this.navigate.navigateRoot(['login']);
  }

    openCli()
    {
      this.navigate.navigateRoot(['listeclient']);
    }

    openParametre()
    {
      this.navigate.navigateRoot(['parametre']);
    }

    isAuth()
    {
      this.navigate.navigateRoot(['tabs/tab1']);
    }
}
