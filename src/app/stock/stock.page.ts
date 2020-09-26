import { Component, OnInit } from '@angular/core';
import { DBStorage } from '../services/database.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  client = [];
  constructor(private db: DBStorage) { }

  ngOnInit() {
  }

}
