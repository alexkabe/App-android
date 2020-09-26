import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastExample } from './toast/toast.component';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  constructor(private navigate: NavController,
              private toast: ToastExample,
              private router: Router) { }

  ngOnInit() {
  }

  openProfil()
  {
      this.navigate.navigateRoot(['parametre/profil']);
  }

  back()
  {
    this.navigate.navigateBack('homepage');
  }
  openToast()
  {
    this.toast.presentToast();
  }
}
