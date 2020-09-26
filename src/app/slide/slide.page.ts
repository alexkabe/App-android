import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: 'slide.page.html',
  styleUrls: ['slide.page.scss']
})
export class SlidePage {

  constructor(private navCtrl: NavController, private menu: MenuController) {
  }

  openEnd()
  {
    this.menu.open('end');
  }

  openCustom()
  {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  onClick()
  {
    this.navCtrl.navigateBack('/');
  }

}
