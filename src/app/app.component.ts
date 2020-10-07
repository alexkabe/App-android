import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  darkMode: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navigate: NavController,
    private storage: Storage)
    {
    this.initializeApp();
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = preference.matches;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
    this.storage.get('User').then(val => {

      if (val)
      {
        this.navigate.navigateRoot('homepage');
      }
      else
      {
        this.navigate.navigateRoot('login');
      }
    });
  }

  darcko()
  {
    this.darkMode = this.darkMode;
    document.body.classList.toggle('dark');
  }

  logger() {
    this.storage.remove('User');
    this.navigate.navigateRoot(['login']);
  }

  param()
  {
    this.navigate.navigateRoot(['parametre']);
  }
}
