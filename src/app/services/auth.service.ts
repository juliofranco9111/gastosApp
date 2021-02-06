import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase';
import firebase from 'firebase/app';





declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth2: any;

  constructor(
    private authFire: AngularFireAuth,
    
  ) { }


  registerUser(email: string, password: string) {
    
    // console.log(email, password);
    return this.authFire.createUserWithEmailAndPassword(email, password)
  }

  passwordReset(email: string) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: `${environment.domain}/login`,
      // This must be true.
      handleCodeInApp: true
    }
    return this.authFire.sendPasswordResetEmail(email, actionCodeSettings);
  }

  //IN


  logIn(email: string, password: string) {
    
    return this.authFire.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    
    return this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // OUT

  signOut() {
    sessionStorage.clear();
    return this.authFire.signOut()
  }



}
