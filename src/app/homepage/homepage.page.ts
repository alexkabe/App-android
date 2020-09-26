import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {Storage } from '@ionic/storage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private router: Router,
              private navigate: NavController,
              private storage: Storage) { }

  ngOnInit() {
  }

  openChat()
  {
    this.router.navigate(['/chat']);
  }

  logger() {
    this.navigate.navigateRoot(['login']);
    this.storage.remove('User');
  }

    openCli()
    {
      this.navigate.navigateRoot(['listeclient']);
    }

    openParametre()
    {
      this.navigate.navigateRoot(['parametre']);
    }

    isAuth()
    {
      this.navigate.navigateRoot(['tabs/tab1']);
    }
}
