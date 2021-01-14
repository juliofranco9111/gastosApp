import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './../components/home/home.component';
import { PagesComponent } from './pages.component';
import { NewMovementComponent } from './../components/new-movement/new-movement.component';
import { MovementsComponent } from './../components/movements/movements.component';
import { InfoComponent } from './../components/info/info.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'new', component: NewMovementComponent }, 
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
}) 
export class ChildRoutesModule { }
