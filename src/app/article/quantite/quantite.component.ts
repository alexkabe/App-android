import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-quantite',
  templateUrl: './quantite.component.html',
  styleUrls: ['./quantite.component.scss'],
})
export class QuantiteComponent implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}
}
