import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Users } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  users = [];
  user = {
    pseudo: String,
    password: String,
    state: 'false'
  };
  constructor(private utilisateur: Users,
              private router: Router,
              private storage: Storage) {
  }

  onSubmit(form: NgForm) {
    const nom = form.value.pseudo;
    this.user.pseudo = nom;
    const passe = form.value.password;
    this.user.password = passe;

    const navigationExtra: NavigationExtras = {
      state: this.user
    };

    this.router.navigate(['/homepage/' + form.value.state], navigationExtra);
    form.reset();
  }
}
