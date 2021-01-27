import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFire: AngularFireAuth
  ) { }


  getCurrentUser() {
    this.authFire.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        return user
      }
    })
  }


  registerUser(email: string, password: string) {
    // console.log(email, password);
    return this.authFire.createUserWithEmailAndPassword(email, password)
  }

  passwordReset(email: string) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:4200/#/login',
      // This must be true.
      handleCodeInApp: true
    }

/*     this.authFire. */

    return this.authFire.sendPasswordResetEmail(email, actionCodeSettings);
    
  }




  signOut() {
    return this.authFire.signOut()
  }

  logIn(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password);
  }

}
