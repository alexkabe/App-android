import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit{

  constructor(private popoverController: PopoverController,
              private navigate: Router,
              public navController: NavController) {

               }

  ngOnInit() {}
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev
    });
    return await popover.present();
  }

  addFacture(donnee: number)
  {
    this.navigate.navigate(['/tabs/tab3/:id', donnee]);
    this.popoverController.dismiss();
  }
}
