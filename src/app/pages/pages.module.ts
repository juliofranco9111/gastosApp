import { LoadingComponent } from './../components/shared/loading/loading.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NavbarComponent } from './../components/navbar/navbar.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './../components/home/home.component';
import { MovementsComponent } from '../components/movements/movements.component';
import { NewMovementComponent } from './../components/new-movement/new-movement.component';
import { InfoComponent } from './../components/info/info.component';





@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    HomeComponent,
    InfoComponent,
    MovementsComponent,
    NewMovementComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    InfoComponent,
    MovementsComponent,
    NewMovementComponent,
    LoadingComponent
  ]
})
export class PagesModule { }
