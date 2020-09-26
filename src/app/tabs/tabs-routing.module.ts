import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidDesease } from '../services/maladie.service';
import { TabsPage } from './tabs.page';
import { PaysPageModule } from '../pays/pays.module';
import { Auth } from '../services/auth.service';
import { AuthUser } from '../services/authUser.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2/:id',
        resolve: {
          base: CovidDesease
        },
        canActivate: [Auth],
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'pays',
        loadChildren: () => import('../pays/pays.module').then(m => m.PaysPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab3/:id',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'slide',
        loadChildren: () => import('../slide/slide.module').then(m => m.SlidePageModule)
      },
      {
        path: 'pays/:id',
        loadChildren: () => import('../pays/pays.module').then(m => m.PaysPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/slide',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/slide',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
