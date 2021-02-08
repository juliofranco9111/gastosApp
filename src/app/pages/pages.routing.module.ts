import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { PagesComponent } from './pages.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['register']);

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./child-routes.module')
      .then(m => m.ChildRoutesModule),
    canActivate: [AngularFireAuthGuard], data:{ authGuardPipe: redirectUnauthorizedToLogin }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
}) 
  
export class PagesRoutingModule { } 
