import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabService } from '../services/client.service';
import { DBStorage } from '../services/database.service';

@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.page.html',
  styleUrls: ['./listeclient.page.scss'],
})
export class ListeclientPage implements OnInit {

  clients: any = [];
  articles: any = [];
  constructor(private db: TabService,
              private navigate: NavController)
  {
    this.clients = this.db.getAllArticle();
    this.articles = this.db.getAllArticle();
  }

  ngOnInit() {
  }

  back()
  {
    this.navigate.navigateBack('homepage');
  }
}
