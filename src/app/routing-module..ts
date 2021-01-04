import { NewMovementComponent } from './components/new-movement/new-movement.component';
import { MovementsComponent } from './components/movements/movements.component';
import { InfoComponent } from './components/info/info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'new', component: NewMovementComponent },
  { path: '**', component: HomeComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }