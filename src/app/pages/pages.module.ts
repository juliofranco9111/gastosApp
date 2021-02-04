import { LoadingComponent } from './../components/shared/loading/loading.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NavbarComponent } from './../components/navbar/navbar.component';
import { PagesComponent } from './pages.component';
import { MovementsComponent } from '../components/movements/movements.component';
import { NewMovementComponent } from './../components/new-movement/new-movement.component';
import { InfoComponent } from './../components/info/info.component';
import { EditMovementComponent } from '../components/edit-movement/edit-movement.component';
import { UserCardComponent } from '../components/user-card/user-card.component';





@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    InfoComponent,
    MovementsComponent,
    NewMovementComponent,
    LoadingComponent,
    EditMovementComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    InfoComponent,
    MovementsComponent,
    NewMovementComponent,
    LoadingComponent,
    EditMovementComponent
  ]
})
export class PagesModule { }
