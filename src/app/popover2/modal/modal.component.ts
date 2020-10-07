import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DBStorage } from '../../services/database.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html', 
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  serialDefault: any;
  unpairedDevices: any;
  pairedDevices: any;
  // tslint:disable-next-line: ban-types
  gettingDevices: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController,
              private storage: Storage,
              private modalController: ModalController,
              private db: DBStorage)
  {
    this.bluetoothSerial.list().then(success => {
      this.pairedDevices = success;
    },
      (err) => {
        console.log(err);
      });
  }

  ngOnInit() {}


  startScanning() {

    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then(success => {
        this.pairedDevices = success;
      },
        (err) => {
          console.log(err);
        });
  }

  async selectDevice(address: any) {
    const alert = await this.alertCtrl.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
            this.storage.set('Bluetooth', address);
          }
        }
      ]
    });
    await alert.present();
  }
  success = (data) =>
  {
    alert(data);
    this.modalController.dismiss();
  }
  fail = (error) => alert(error);


  async  disconnect() {
    const alert = await this.alertCtrl.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
            this.storage.remove('Bluetooth');
            this.db.sendDataToSerial(this.bluetoothSerial);
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

}
