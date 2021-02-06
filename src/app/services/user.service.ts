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



  async getUser() {

    const authUser = this.authFire.currentUser;

    authUser.then(async usuario => {


      if (usuario) {


        let { email, displayName, uid } = usuario;
        
        let role;
        let google;

        if (!displayName || !role || !google) {
          this.dB.returnUserById(uid).subscribe(user => {
            if (!displayName) {
              displayName = user.displayName;
            }
            if (!role) {
              role = user.role;
            }
            if (!google) {
              google = user.google;
            }

            this.user = { uid, agree: true, email, displayName, role, google };

            this.UpdateProfileName(displayName).then(() => true)

          },err => {return false});
       
          this.user = { uid, agree: true, email, displayName, google, role };
        }

      }
    })
  }

}


