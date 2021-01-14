import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private database: DatabaseService,
    private authService: AuthService
  ) { 
    this.getUser();
  }

  public uid: string;
  public user:User

  saveUser(user: User) {
    return this.database.saveUser(user);
  }

  getUser() {
    if (localStorage.getItem('uid')) {
      this.uid = localStorage.getItem('uid');
      return this.uid;
    } else {
      this.user = this.authService.getCurrentUser();
      console.log(this.user)
      if(this.user === null || this.user === undefined){
        console.log('no está autenticado')
      }else{
        localStorage.setItem('uid', JSON.stringify(this.user.uid))
      }
    }
  }

}


