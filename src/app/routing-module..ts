import { PruebaComponent } from './components/prueba/prueba.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing.module';
import { AuthRoutingModule } from './components/auth/auth.routing.module';

import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  
  
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  { path: 'prueba', component: PruebaComponent } ,
  { path: '**', component: ErrorComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true}),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})

export class RoutingModule { }