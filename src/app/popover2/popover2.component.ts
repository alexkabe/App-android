import { Component, NgZone, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DBStorage } from '../services/database.service';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-popover2',
  templateUrl: './popover2.component.html',
  styleUrls: ['./popover2.component.scss'],
})
export class Popover2Component implements OnInit {

  numliste: number = 0;
  devices = [];
  constructor(private popoverController: PopoverController,
              private db: DBStorage,
              private ble: BLE, private ngZone: NgZone)
  {
  }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: Popover2Component,
      event: ev
    });
    return await popover.present();
  }


  addFacture()
  {
    this.db.numliste = 1;
    this.db.addFacture();
    this.popoverController.dismiss();
    this.db.articleChoisi = [];
  }

  dropFact()
  {
    this.db.dropFactend();
    this.popoverController.dismiss();
  }

  printer()
  {
    this.devices = [];
    this.ble.scan([], 15).subscribe(device =>
      this.onDeviceDiscovered(device)
    );

    // for (let device of this.devices)
    // {
    //   console.log('Id: ' + device.id);
    //   console.log('RSSI: ' + device.rssi);
    // }
  }

  onDeviceDiscovered(device)
  {
    console.log('Discovered', JSON.stringify(device, null, 2));
    this.ngZone.run(() =>
    {
      this.devices.push(device);
      console.log(device);
    });
  }

  // tslint:disable-next-line: adjacent-overload-signatures

}
