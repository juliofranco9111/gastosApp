import { InfoService } from './info.service';
import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = {
    uid: '',
    agree: true,
    email: '',
    lastName: '',
    name: ''
  };

  constructor(
    private dB: DatabaseService,
    private authService: AuthService,
    private authFire: AngularFireAuth
  ) { 
    this.getUser();
  }

  async UpdateProfile(displayName: string) {
    const profile = {
      displayName: displayName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }
    return (await this.authFire.currentUser).updateProfile(profile);
  }

  

  getUser() {

    const authUser = this.authFire.currentUser;

    authUser.then(usuario => {
      const { email, displayName, uid, emailVerified } = usuario;
      
      let split = displayName.split(' ');
      let lastName = '';
      let name = ''; 

      if (split.length > 1) {
        lastName = split[1];
        name = split[0];
      } else {
        name = displayName;
      }      
      return this.user = { uid, agree: true, email, lastName, name }
    })
  }

}


