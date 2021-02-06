import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatabaseService } from '../../../services/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {



  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public subscription: Subscription;

  public formSubmitted = false;

  public remember = true;

  public emailUser: string;




  constructor(
    private router: Router,
    private authService: AuthService,
    private dB: DatabaseService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.emailUser = localStorage.getItem('email')
      this.loginForm.controls.email.setValue(this.emailUser);
    }
  }

  logInWithEmailAndPassword() {

    this.formSubmitted = true;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (this.remember) {
      this.saveStorage('email', this.loginForm.value.email);
    } else if (localStorage.getItem('email')) {
      this.deleteStorage('email')
    }

    this.authService.logIn(email, password)
      .then((data: any) => {
        this.userService.reloadUser();
        this.dB.lastLogin(data.user.uid).then(() => {

            this.router.navigateByUrl('/home');
         


        })
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      })
  }

  loginWithGoogle() {
    
    this.authService.loginWithGoogle()
      .then((user: any) => {


        const { uid, email, displayName } = user.user;

        const userGoogle: User = {
          uid,
          email,
          displayName,
          agree: true,
          role: 'USER',
          google: true
        };

        this.userService.reloadUser();

        this.subscription = this.dB.saveUser(userGoogle)
          .subscribe(user => {

            

            this.dB.lastLogin(uid).then(data => {
              this.router.navigateByUrl('/home');
            });
          }
            , err => console.error(err))

      })
      .catch(err => console.error(err))
  }





  /* *************************** */

  notValidField(campo: string): boolean {

    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  saveStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  loadStorage(key: string) {
    return localStorage.getItem(key);
  }

  deleteStorage(key: string) {
    localStorage.removeItem(key);
  }

}
