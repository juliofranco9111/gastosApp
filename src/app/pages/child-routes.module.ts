import { EditMovementComponent } from './../components/edit-movement/edit-movement.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { NewMovementComponent } from './../components/new-movement/new-movement.component';
import { MovementsComponent } from './../components/movements/movements.component';
import { InfoComponent } from './../components/info/info.component';

const childRoutes: Routes = [
  { path: '', component: MovementsComponent },
  { path: 'home', component: MovementsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'new', component: NewMovementComponent }, 
  { path: 'edit/:year/:month/:id', component: EditMovementComponent }, 
  
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
