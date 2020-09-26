import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DBStorage } from '../services/database.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class FilterComponent implements OnInit {

 tabclient = [];

 constructor(private modalCtrl: ModalController,
             private db: DBStorage){}

 ngOnInit()
 {
   this.tabclient = JSON.parse(localStorage.getItem('Client'));
 }

 dismiss(){
   this.modalCtrl.dismiss();
 }
 validate()
 {
   this.modalCtrl.dismiss();
 }
}
