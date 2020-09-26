import { BehaviorSubject } from 'rxjs';

export class DBStorage {

    factureonChange: BehaviorSubject<any>;
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
    numliste: number = 0;
    verif: boolean = false;
    articleChoisi = [];
    numtest = 0;
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
                  quantite: 25
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25
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
                  quantite: 25
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25
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
                  quantite: 25
                },
                {
                  id: 2,
                  code: '32H9093',
                  noma: 'Voiture',
                  prix: 2500,
                  quantite: 25
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
        prix: 2500,
        quantite: 25
      },
      {
        id: 3,
        code: '37LKK3',
        noma: 'Riz',
        prix: 2500,
        quantite: 25
      }
    ];

    constructor()
    {
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

        for (let article of this.articles)
         {
             for (let choisi of this.articleChoisi)
             {
                 if (choisi.code === article.code)
                 {
                     article.quantite = article.quantite - choisi.quantite;
                 }
             }
        }

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

}