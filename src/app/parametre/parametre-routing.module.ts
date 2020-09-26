import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametrePage } from './parametre.page';

const routes: Routes = [
  {
    path: '',
    component: ParametrePage
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrePageRoutingModule {}
