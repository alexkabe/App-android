import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

export class Bluetooth
{
    unpairedDevices: any;
    pairedDevices: any;
    // tslint:disable-next-line: ban-types
    gettingDevices: Boolean;
constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
      bluetoothSerial.enable();
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
      this.bluetoothSerial.list().then((success) => {
        this.pairedDevices = success;
      });

}


success = (data) => alert(data);
fail = (error) => alert(error);



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
            }
          }
        ]
      });
      alert.present();
}

async disconnect() {
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
            }
          }
        ]
      });
    alert.present();
}




sendDataToSerial() {
    this.bluetoothSerial.write(
        this.write()
      ).then((success) => {
        alert('Success');
      }, (failure) => {
        alert('Echec');
      });
}


declareLabelSize(pitchLengthOfLabel, effectivePrintWidth, effectivePrintLength): string {
  return '{D' + pitchLengthOfLabel + ',' + effectivePrintWidth + ',' + effectivePrintLength + '|}';
}

cleanBuffer(): string {
  return '{C|}';
}

printWriteCommand(id: string, x: string, y: string, text: string): string {
  return '{PC' + id + ';' + y + ',' + x + ',' + '1' + ',' + '1' + ',' + 'O' + ',' + '00' + ',' + 'B=' + text + '|}';
}

printDrawLine(xStartPoint, yStartPoint, xEndPoint, yEndPoint): string {
  return '{LC;' + yStartPoint + ',' + xStartPoint + ',' + yEndPoint + ',' + xEndPoint + ',' + '0' + ',' + '3|}';
}

generateBarcode(barcodeTotalNumber, x, y, rotationAngleOfBarcode, barcodeNumber): string {
  // tslint:disable-next-line: max-line-length
  return '{XB' + barcodeTotalNumber + ';' + x + ',' + y + ',' + 'A,3,03,' + rotationAngleOfBarcode + ',0128,+0000000000,000,1,00=>5' + barcodeNumber + '|}';
}

printConditions(): string {
  return '{XS;I,0001,0002C1011|}';
}

write(): string {
  const toshibaPrintScript: string =
    this.declareLabelSize('0700', '0700', '0690') +
    this.cleanBuffer() +
    this.printWriteCommand('00', '0050', '0010', 'Gonderici Adresi') +
    this.printWriteCommand('01', '0100', '0010', 'Resitpasa Mahallesi Katar Caddesi') +
    this.printWriteCommand('02', '0150', '0010', 'No:4/B3 Sariyer/Istanbul') +
    this.printDrawLine('0160', '0000', '0160', '2000') +
    this.printWriteCommand('03', '0200', '0010', 'Alici Adresi') +
    this.printWriteCommand('04', '0250', '0010', 'Yenikoy Mahallesi Doganlar Caddesi') +
    this.printWriteCommand('05', '0300', '0010', 'No:12/2 Savsat/Artvin') +
    this.printDrawLine('0310', '0000', '0310', '2000') +
    this.generateBarcode('00', '0200', '0460', '0', '12345678') +
    this.printConditions();
  return toshibaPrintScript;
}

// Voici comment je les appels dans le Template!



// <ion-list padding>
// <button ion-button block (click)="startScanning()">scan</button>
// <ion-list-header>
//   Paired Devices
// </ion-list-header>
// <ion-item *ngFor="let device of pairedDevices">
//   {{device.name}}
// </ion-item>
// <button ion-button block (click)="disconnect()">Disconnect</button>
// <ion-list-header>
//   availlable Devices
// </ion-list-header>
// <ion-item *ngFor='let device of unpairedDevices'>
//   <span (click)="selectDevice(device.address)">
//     {{device.name}}
//   </span>
// </ion-item>
// <ion-spinner name="crescent" *ngIf="gettingDevices"></ion-spinner>


// <ion-item>
//   <button ion-button (click)="sendDataToSerial()">Yazdır</button>
// </ion-item>
// </ion-list>

}
