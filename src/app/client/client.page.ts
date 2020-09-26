import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DBStorage } from '../services/database.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  client2: any = [];
  constructor(private modalCtrl: ModalController,
              private db: DBStorage)
  {
    this.client2 = this.db.clients;
  }

  ngOnInit() {
  }

  listeClient(choix2: number)
  {
    this.modalCtrl.dismiss(choix2);
  }

}
