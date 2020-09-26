import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavController, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverComponent } from './popover/popover.component';
import { Popover2Component } from './popover2/popover2.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { TabService } from './services/client.service';
import { ClientPage } from './client/client.page';
import { ArticlePage } from './article/article.page';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DBStorage } from './services/database.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockPipe } from './stock.pipe';
import { ParametrePageModule } from './parametre/parametre.module';
import { ToastExample } from './parametre/toast/toast.component';
import { AlerteExample } from './parametre/alerte/alerte.component';
import { CovidDesease } from './services/maladie.service';
import { Auth } from './services/auth.service';
import { Users } from './services/user.service';
import { AuthUser } from './services/authUser.service';
import { QuantiteComponent } from './article/quantite/quantite.component';
import { BLE } from '@ionic-native/ble/ngx';

@NgModule({
  declarations: [AppComponent, ClientPage, ArticlePage, StockPipe],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, ParametrePageModule, IonicModule.forRoot(), AppRoutingModule,
  IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    TabService,
    NavController,
    NavParams,
    PopoverComponent,
    FormsModule,
    FormBuilder,
    CovidDesease,
    Auth,
    AuthUser,
    Users,
    CommonModule,
    BLE,
    ReactiveFormsModule,
    Popover2Component,
    ToastExample,
    QuantiteComponent,
    AlerteExample,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    HttpClientModule,
    SQLitePorter,
    Storage,
    DBStorage

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
