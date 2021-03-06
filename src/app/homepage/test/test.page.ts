import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage {

  devices: any[] = [];
  serialDefault: any;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController,
              private storage: Storage) {
    bluetoothSerial.enable();

    this.storage.get('Bluetooth').then(val =>
    {
      this.serialDefault = val;
    });
  }

  look()
  {
    if (this.serialDefault == null)
    {
        this.pairedDevices = null;
        this.unpairedDevices = null;
        this.gettingDevices = true;
        this.bluetoothSerial.discoverUnpaired().then((success) => {
          this.unpairedDevices = success;
          this.gettingDevices = false;
          success.forEach(element => {
            // alert(element.name);
          });
        },
          (err) => {
            console.log(err);
          });

        this.bluetoothSerial.list().then(success => {
          this.pairedDevices = success;
        },
          (err) => {

          });
      }
    else
    {
      alert(this.serialDefault);
    }
  }


  startScanning() {

    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then(success => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  async selectDevice(address: any) {
    let alert = await this.alertCtrl.create({
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

  async  disconnect() {
    let alert = await this.alertCtrl.create({
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
          }
        }
      ]
    });
    await alert.present();
  }




  sendDataToSerial() {
    // this.bluetoothSerial.write('{D0931,0480,0601|}
    // {C|}
    // {PC00;0071,0131,1,1,A,00,B=Örnek Yazı|}
    // {LC;0000,0180,0480,0185,0,3|}
    // {XB00;0091,0440,A,3,03,0,0128,+0000000000,000,1,00=>512345678|}
    // {XS;I,0001,0002C1011|}')
    this.bluetoothSerial.write(
      this.write()
    ).then((success) => {

    }, (failure) => {

    });
  }


  declareLabelSize(pitchLengthOfLabel, effectivePrintWidth, effectivePrintLength): string {
    return '{D' + pitchLengthOfLabel + ',' + effectivePrintWidth + ',' + effectivePrintLength + '|}';
  }

  cleanBuffer(): string {
    return '{C|}';
  }

  printWriteCommand( text: string): string {
    return '{' + text + '}';
  }

  printDrawLine(xStartPoint, yStartPoint, xEndPoint, yEndPoint): string {
    return '{LC;' + yStartPoint + ',' + xStartPoint + ',' + yEndPoint + ',' + xEndPoint + ',' + '0' + ',' + '3|}';
  }

  printConditions(): string {
    return '{XS;I,0001,0002C1011|}';
  }

  write(): string {
    let toshibaPrintScript: string =
      this.declareLabelSize('0700', '0700', '0690') +
      this.cleanBuffer() +
      this.printWriteCommand('Voici la page test de notre travil') +
      this.printConditions();
    return toshibaPrintScript;
  }

}
