import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlerteExample } from '../alerte/alerte.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private navigate: NavController,
              private alerte: AlerteExample) { }

  ngOnInit() {
  }

  back()
  {
    this.navigate.navigateRoot(['parametre']);
  }

  openAlert()
  {
    this.alerte.presentAlertPrompt();
  }
}
