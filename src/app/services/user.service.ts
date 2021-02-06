import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';

import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = {
    uid: '',
    agree: true,
    email: '',
    displayName: '',
    role: null,
    google: null
  };

  constructor(
    private dB: DatabaseService,
    private authFire: AngularFireAuth
  ) {
    this.getUser();
  }

  

  async UpdateProfileName(displayName: string) {
    const profile = {
      displayName
    }
    return (await this.authFire.currentUser).updateProfile(profile);
  }

  async UpdateProfileEmail(email: string) {

    return (await this.authFire.currentUser).updateEmail(email);
  }

  reloadUser() {
    this.getUser();
  }

  async getUser() {

    const authUser = this.authFire.currentUser;

    await authUser.then(usuario => {
      if (usuario) {
        let { email, displayName, uid } = usuario;
        let role;
        let google;

        this.dB.returnUserById(uid).subscribe(async user => {
          if (!displayName) {
            console.log('display');
            displayName = user.displayName;
            this.UpdateProfileName(displayName).then(() => true)
          }  
            role = user.role;
            google = user.google;
          

          this.user = { uid, agree: true, email, displayName, role, google };

        }, err => false);       
      }
      
    });
    

  }

}


