import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { DBStorage } from '../services/database.service';
import { Storage } from '@ionic/storage';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalComponent } from '../popover2/modal/modal.component';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-popover2',
  templateUrl: './popover2.component.html',
  styleUrls: ['./popover2.component.scss'],
})
export class Popover2Component implements OnInit {

  numliste = 0;
  serialDefault: any;

  facture =
    {
        client: {
                code: '',
                nom:  '',
                prenom: '',
                psa: 0
        },
        article: [],
        total: 0,
        solde: 0,
        psa: 0,
        tva: 0,
        ttt: 0
    };
  totalcolis = 1;
  totalcasier = 0;
  embplein = 0;
  embvide = 0;
  psa = 2;

  letterObj = {
    from: 'Simon',
    to: 'Paul',
    text: 'Bonjour Bobo',
    operateur: 'Administrateur',
    preselleur: 'BERYNYUY PAUL',
    client: 'HAGAK WOUWE BORICE LEBON',
    NC: 'P0W3V4NKKJ44I23',
    code: 'KNL0012'
  };
  pdfObj = null;

  articles = [
    {code: '', produit: '', quantite: '', prix: '', total: ''}
  ];

  produit = [
    { produit: 'Barbe a papa', quantite: 3, pu: 100, total: 300 },
    { produit: 'Banane', quantite: 4, pu: 200, total: 800 },
    { produit: 'Papaye', quantite: 5, pu: 400, total: 2000 },
    { produit: 'Ananas', quantite: 6, pu: 300, total: 1800 }
  ];

  emballage = [
    { emballage: 'Consignation', quantite: 3, pu: 100, total: 300 },
    { emballage: 'Deconsignation', quantite: 4, pu: 200, total: 800 }
  ];

  constructor(private popoverController: PopoverController,
              private db: DBStorage,
              private storage: Storage,
              private bluetoothSerial: BluetoothSerial,
              private modal: ModalController,
              private file: File,
              private fileOpener: FileOpener)
  {
    this.storage.get('Bluetooth').then(val =>
      {
        this.serialDefault = val;
      });
    this.db.factChange.subscribe(val => {
      this.facture = val;
    });
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
    if (this.serialDefault)
    {
      this.bluetoothSerial.connect(this.serialDefault);
    }
  }

  dropFact()
  {
    this.db.dropFactend();
    this.popoverController.dismiss();
  }

  async printer()
  {

    if (this.serialDefault)
    {
      this.db.sendDataToSerial(this.bluetoothSerial);
      this.popoverController.dismiss();
    }
    else
    {
      this.openModal();
    }

  }


  async openModal()
  {
    const modalArticle = await this.modal.create({
      component: ModalComponent,
      cssClass: 'modal'
    });
    await modalArticle.present();
    this.popoverController.dismiss();
  }


  buildTableBody(data, columns) {
    const body = [];

    body.push(columns);

    data.forEach((row) => {
        const dataRow = [];

        columns.forEach((column) => {
            dataRow.push(row[column].toString());
        });

        body.push(dataRow);
    });

    return body;
  }
  table(data, columns) {
    return {
        table: {
            headerRows: 1,
            body: this.buildTableBody(data, columns)
        }
    };
  }

   generatePdf()
   {

     this.articles = this.facture.article;
     console.log(this.articles);
     const column = [];
     let i = 0;
     for ( i = 0 ; i < 10 ; i++)
     {
      column.push({ text: i, style: 'space', alignment: 'left'});
     }
     const docDefinition = {
       content: [
         { text: this.facture.client.nom + ' ' + this.facture.client.prenom, style: 'header'},
         { text: 'NC: M022014402219P', style: 'header'},
         { text: 'RCCM: RC/YAE/2020/B/717', style: 'header'},
         { text: 'Adresse Yaounde', style: 'header'},
         { text: this.letterObj.text, style: 'header'},
         { text: 'tel: 678630888', style: 'header'},
         { text: 'FACTURE N: 191431', style: 'space', alignment: 'center'},
         { text: 'Operateur: ' + ' ' + this.letterObj.operateur, style: 'space', alignment: 'left'},
         { text: 'Preselleur: ' + ' ' + this.letterObj.preselleur, style: 'subheader'},
         { text: 'Client: ' + ' ' + this.facture.client.nom, style: 'subheader'},
         { text: 'NC: ' + ' ' + this.letterObj.NC, style: 'subheader'},
         { text: 'Code: ' + ' ' + this.facture.client.code, style: 'subheader'},
         { text: 'Date: ' + ' ' + new Date().toTimeString(), style: 'subheader'},
         { text: 'Produits', style: 'entree'},
         this.table(this.articles, ['code', 'produit', 'quantite', 'prix', 'total']),
         { text: 'Emballages', style: 'entree'},
         this.table(this.emballage, ['emballage', 'quantite', 'pu', 'total']),
         // tslint:disable-next-line: max-line-length
         { text: 'Total Colis:  ' + ';     Total Casier: ' + this.totalcasier, style: 'spaceB', bold: 'true'},
         { text: 'EMB Plein: ' + this.embplein + ';     EMB Vide: ' + this.embvide, style: 'spaceB', bold: 'true'},
         { text: '', style: 'entree'},
         { text: 'Montant HT:        ' + this.facture.total + ' FCFA'},
         { text: 'TVA (19,25%):     ' + this.facture.tva + ' FCFA'},
         { text: 'PSA(' + this.facture.client.psa + '%):             ' + this.facture.psa + ' FCFA'  },
         { text: 'Montant TTC:     ' + this.facture.solde + ' FCFA'},
         { text: 'Remise:               ' + ' FCFA'},
         { text: 'Transport:           ' + ' FCFA'},
         { text: '', style: 'entree'},
         { text: 'NET A PAYER:        ' + this.facture.solde + ' FCFA' , alignment: 'center', bold: 'true'},
         { text: '', style: 'entree'},
         { text: 'Ristourne encours: ', fontSize: '10', bold: 'true'},
         { text: 'Solde ristourne encours: ', fontSize: '10', bold: 'true'},

         { text: 'Vendeur                                                                                                                                                   Client', style: 'espace'}

       ],
       styles: {
         header: {
           fontSize: 11,
           bold: true,
           alignment: 'center'
         },
         subheader: {
           fontSize: 11,
           bold: true,
           alignment: 'left'
         },
         story: {
           italic: true,
           alignment: 'center',
           width: '50%'
         },
         space:
         {
          fontSize: 11,
          bold: true,
          margin: [0, 15, 0, 0]
         },
         espace:
         {
          fontSize: 11,
          margin: [0, 15, 0, 0]
         },
         spaceB:
         {
          fontSize: 11,
          margin: [0, 15, 0, 0]
         },
         entree:
         {
            bold: true,
            margin: [0, 15, 0, 15]
         }
       }
     };
     this.popoverController.dismiss();
     this.pdfObj = pdfMake.createPdf(docDefinition);

    //  this.platform.ready().then(() =>
    //    {
    //      console.log('Entree');
    //      this.pdfObj.getBuffer((buffer) =>
    //      {

    //        const utf8 = new Uint8Array(buffer);
    //        const binaryArray = utf8.buffer;
    //        const  blod = new Blob([binaryArray], {type: 'application/pdf'});

    //        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blod, {replace: true}).then((fileEntry) => {
    //          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');

    //        });
    //      });
    //   // tslint:disable-next-line: no-unused-expression
    //   }), () =>
    //    {
        this.pdfObj.open();
    //  };
   }

  dowload()
  {
      this.pdfObj.download();
  }

}
