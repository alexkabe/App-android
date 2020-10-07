import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TabService } from '../services/client.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.page.html',
  styleUrls: ['./listeclient.page.scss'],
})
export class ListeclientPage implements OnInit {

  clients: any = [];
  articles: any = [];

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

  totalcolis = 1;
  totalcasier = 0;
  embplein = 0;
  embvide = 0;
  psa = 2;



  constructor(private db: TabService,
              private navigate: NavController,
              private file: File,
              private fileOpener: FileOpener,
              private platform: Platform)
  {
    this.db.getDatabase().subscribe(rdy => {
      if (rdy)
      {
        this.db.getClient().subscribe(clt =>
          {
            this.clients = clt;
            alert(this.clients);
          });
      }
    });
  }
  ngOnInit() {
  }

  back()
  {
    this.navigate.navigateBack('homepage');
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
            body: this.buildTableBody(data, columns),
            style: {
              alignment : 'center'
            }
        }
    };
  }

   generatePdf()
   {
     const column = [];
     let i = 0;
     for ( i = 0 ; i < 10 ; i++)
     {
      column.push({ text: i, style: 'space', alignment: 'left'});
     }
     const docDefinition = {
       content: [
         { text: 'BORIS & KRISTE Sarl', style: 'header'},
         { text: 'NC: M022014402219P', style: 'header'},
         { text: 'RCCM: RC/YAE/2020/B/717', style: 'header'},
         { text: 'Adresse Yaounde', style: 'header'},
         { text: this.letterObj.text, style: 'header'},
         { text: 'tel: 678630888', style: 'header'},
         { text: 'FACTURE N: 191431', style: 'space', alignment: 'center'},
         { text: 'Operateur: ' + ' ' + this.letterObj.operateur, style: 'space', alignment: 'left'},
         { text: 'Preselleur: ' + ' ' + this.letterObj.preselleur, style: 'subheader'},
         { text: 'Client: ' + ' ' + this.letterObj.client, style: 'subheader'},
         { text: 'NC: ' + ' ' + this.letterObj.NC, style: 'subheader'},
         { text: 'Code: ' + ' ' + this.letterObj.code, style: 'subheader'},
         { text: 'Date: ' + ' ' + new Date().toTimeString(), style: 'subheader'},
         { text: 'Produits', style: 'entree'},
         [
            this.table(this.produit, ['produit', 'quantite', 'pu', 'total']),
          ],
         { text: 'Emballages', style: 'entree'},
         this.table(this.emballage, ['emballage', 'quantite', 'pu', 'total']),
         { text: 'Total Colis:  ' + this.totalcolis + ';     Total Casier: ' + this.totalcasier, style: 'spaceB', bold: 'true'},
         { text: 'EMB Plein: ' + this.embplein + ';     EMB Vide: ' + this.embvide, style: 'spaceB', bold: 'true'},
         { text: '', style: 'entree'},
         { text: 'Montant HT:        f'},
         { text: 'TVA (19,25%):     f'},
         { text: 'PSA(' + this.psa + '%):             f' },
         { text: 'Montant TTC:     f '},
         { text: 'Remise:               f '},
         { text: 'Transport:           f'},
         { text: '', style: 'entree'},
         [
            { text: 'Acer', alignment: 'right'}
       ],
         { text: '', style: 'entree'},
         { text: 'Ristourne encours:', fontSize: '10', bold: 'true'},
         { text: 'Solde ristourne encours', fontSize: '10', bold: 'true'},

         { text: 'Vendeur                                                           Client', style: 'espace'}

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
          margin: [0, 15, 0, 15]
         }
       }
     };

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
