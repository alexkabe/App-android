import { Component, OnInit } from '@angular/core';
import { CovidDesease } from '../services/maladie.service';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute,  NavigationExtras, Router} from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  pays = null;
  constructor(private router: Router,
              private route: ActivatedRoute){}
  ngOnInit()
  {
    this.pays = this.route.snapshot.data['base'];
  }

  view(i)
  {

  }

  openModal(data)
  {
    let navigationExtra: NavigationExtras =
    {
      queryParams: {
        state: JSON.stringify(this.pays[data])
      }
    };


    this.router.navigate(['tabs/pays'], navigationExtra);
  }


}