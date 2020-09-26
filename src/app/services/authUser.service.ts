import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthUser implements CanActivate {


  users =
  [
       {
           id: 1,
           numero: '8912B8932',
           nom:  'Ali',
           prenom: 'baba',
           test: false,
           pseudo: 'alex',
           password: 'al'
         },
         {
           id: 2,
           numero: '89MN83I9',
           nom:  'Kalicha',
           prenom: 'Mortone',
           test: true,
           pseudo: 'kabe',
           password: 'ka'
         },
         {
           id: 3,
           numero: '891H29A',
           nom:  'Partage',
           prenom: 'Salla',
           test: true,
           pseudo: 'olivier',
           password: 'oli'
         }
  ];

  selectId = null;
  constructor(private alertController: AlertController,
              private router: Router)
  {
    //this.users = JSON.parse(localStorage.getItem('Users'));
  }


  canActivate()
  {

    this.selectId = this.router.getCurrentNavigation().extras.state;

    if (this.users)
    {
      for (let value of this.users)
      {
          if (this.selectId.pseudo === value.pseudo)
          {
              if (this.selectId.password === value.password)
              {
                  return true;
              }
              else
              {
                   this.alertController.create({
                   header: 'Desole',
                   message: 'Mot de passe incorecte',
                   buttons: ['Ok']
                   }).then(alert => alert.present());
                   return false;
              }
          }

      }
    }

    this.alertController.create({
    header: 'Desole',
    message: 'Pseudo incorrecte',
    buttons: ['Ok']
    }).then(alert => alert.present());
    return false;
    }
}
