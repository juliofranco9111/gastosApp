import { RoutingModule } from './routing-module.';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MovementsComponent } from './components/movements/movements.component';
import { NewMovementComponent } from './components/new-movement/new-movement.component';
import { LoadingComponent } from './components/shared/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    NavbarComponent,
    HomeComponent,
    MovementsComponent,
    NewMovementComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
