import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PagesModule } from './pages/pages.module';
import { RoutingModule } from './routing-module.';
import { AuthModule } from './components/auth/auth.module';
import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';

import { ErrorComponent } from './pages/error/error.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RoutingModule,
    AuthModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
