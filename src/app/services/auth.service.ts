import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class Auth implements CanActivate {


  users =
  [
       {
           id: 1,
           numero: '8912B8932',
           nom:  'Ali',
           prenom: 'baba',
           test: false
         },
         {
           id: 2,
           numero: '89MN83I9',
           nom:  'Kalicha',
           prenom: 'Mortone',
           test: true
         },
         {
           id: 3,
           numero: '891H29A',
           nom:  'Partage',
           prenom: 'Salla',
           test: true
         }
  ];

  constructor(private alertController: AlertController)
  {
    //this.users = JSON.parse(localStorage.getItem('Users'));
  }

  canActivate( route: ActivatedRouteSnapshot )
  {
    let selectId = route.paramMap.get('id');
    let allowed = selectId;

    if (allowed === 'true')
    {
      return true;
    }
    else
    {
      this.alertController.create({
        header: 'Desole',
        subHeader: 'Controle d\'acces',
        message: 'Vous n\'etes pas autorise a ouvrir cette page',
        buttons: ['Ok']
      }).then(alert => alert.present());
      return false;
    }
  }
}