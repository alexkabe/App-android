import { BehaviorSubject } from 'rxjs';

export class DBStorage {

    factureonChange: BehaviorSubject<any>;
    factChange: BehaviorSubject<any>;
    supprime: BehaviorSubject<any>;

    client = [];
    article = [];
    facture = {
        client: {},
        article: [],
        total: 0,
        solde: 0,
        psa: 0,
        tva: 0,
        ttt: 0
    };
    numliste = 0;
    verif = false;
    articleChoisi = [];
    numtest = 0;
    // tslint:disable-next-line: ban-types
    suppression: Boolean = false;
    numclient: number;

    tabFact: any = [
        {
            client: {
                code: '8912B8932',
                nom:  'Ali',
                prenom: 'baba',
                psa: 5
            },
            article: [
                {
                  id: 1,
                  code: '32K3',
                  noma: 'chaussure',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                }
            ],
            total: 0,
            solde: 0,
            psa: 0,
            tva: 0,
            ttt: 0
        },
        {
            client: {
                code: '8912B8932',
                nom:  'Ali',
                prenom: 'baba',
                psa: 5
            },
            article: [
                {
                  id: 1,
                  code: '32K3',
                  noma: 'chaussure',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                }
            ],
            total: 0,
            solde: 0,
            psa: 0,
            tva: 0,
            ttt: 0
        },
        {
            client: {
                code: '8912B8932',
                nom:  'Ali',
                prenom: 'baba',
                psa: 5
            },
            article: [
                {
                  id: 1,
                  code: '32K3',
                  noma: 'chaussure',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25,
                  total: 0
                }
            ],
            total: 0,
            solde: 0,
            psa: 0,
            tva: 0,
            ttt: 0
        }

    ];
    clients =
    [
      {
        code: '8912B8932',
        nom:  'Ali',
        prenom: 'baba',
        psa: 5
      },
      {
        code: '89MN83I9',
        nom:  'Kalicha',
        prenom: 'Mortone',
        psa: 4
      },
      {
        code: '34HG3N',
        nom:  'Partage',
        prenom: 'Salla',
        psa: 3
      }
    ];

    articles = [
      {
        id: 1,
        code: '32K3',
        noma: 'chaussure',
        prix: 2500,
        quantite: 25
      },
      {
        id: 2,
        code: '32H9093',
        noma: 'Voiture',
        prix: 5500000,
        quantite: 25
      },
      {
        id: 3,
        code: '37LKK3',
        noma: 'Riz',
        prix: 13500,
        quantite: 25
      }
    ];

    constructor()
    {
        this.factChange = new BehaviorSubject({});
        this.factureonChange = new BehaviorSubject({});
        this.supprime = new BehaviorSubject({});
    }

     addFacture()
     {
        if (this.tabFact)
        {

            this.tabFact = [this.facture, ...this.tabFact];
        }
         else
         {
            this.tabFact = [this.facture];
         }

        for (const article of this.articles)
         {
             for (const choisi of this.articleChoisi)
             {
                 if (choisi.code === article.code)
                 {
                     article.quantite = article.quantite - choisi.quantite;
                 }
             }
        }
        this.factChange.next(this.facture);
        this.verif = false;
        this.factureonChange.next(this.tabFact);
     }

     dropFact(i)
     {
         this.tabFact.splice(i, 1);
         this.verif = false;
         this.factureonChange.next(this.tabFact);
         this.supprime.next(this.suppression);
     }

     dropFactend()
     {
        this.tabFact.splice(this.tabFact.length, 1);
        this.verif = false;
        this.factureonChange.next(this.tabFact);
        this.supprime.next(this.suppression);
     }


     sendDataToSerial(bluetoothSerial) {
      // this.bluetoothSerial.write('{D0931,0480,0601|}
      // {C|}
      // {PC00;0071,0131,1,1,A,00,B=Örnek Yazı|}
      // {LC;0000,0180,0480,0185,0,3|}
      // {XB00;0091,0440,A,3,03,0,0128,+0000000000,000,1,00=>512345678|}
      // {XS;I,0001,0002C1011|}')
      bluetoothSerial.write(
        this.write()
      ).then(() => {
        alert('Impression effectuer');
      }, (err) => {
        alert('Erreur' + err);
      });
    }


    declareLabelSize(pitchLengthOfLabel, effectivePrintWidth, effectivePrintLength): string {
      return '{D' + pitchLengthOfLabel + ',' + effectivePrintWidth + ',' + effectivePrintLength + '|}';
    }

    cleanBuffer(): string {
      return '{C|}';
    }

    printWriteCommand(id: string, x: string, y: string, text: string): string {
      // {PC000;0071,0131,1,1,S,00,B=Ornek Yaz|}
      return '{PC' + id + ';' + y + ',' + x + ',' + '1' + ',' + '1' + ',' + 'O' + ',' + '00' + ',' + 'B=' + text + '|}';
    }

    printDrawLine(xStartPoint, yStartPoint, xEndPoint, yEndPoint): string {
      return '{LC;' + yStartPoint + ',' + xStartPoint + ',' + yEndPoint + ',' + xEndPoint + ',' + '0' + ',' + '3|}';
    }

    generateBarcode(barcodeTotalNumber, x, y, rotationAngleOfBarcode, barcodeNumber): string {
      // {XB00;0091,0440,A,3,03,0,0128,+0000000000,000,1,00=>512345678|}
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

}
