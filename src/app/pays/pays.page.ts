import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import {  NavController } from '@ionic/angular';

import { CovidDesease } from '../services/maladie.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],
})
export class PaysPage implements OnInit {


  pays = null;
  constructor( private covid: CovidDesease,
               private navController: NavController,
               private router: Router,
               private route: ActivatedRoute)
  {
    this.route.queryParams.subscribe(params => {
      this.pays = JSON.parse(params.state);
    });
  }

  ngOnInit() {
  }

  back()
  {
    this.router.navigate(['tabs/tab2']);
  }


}
