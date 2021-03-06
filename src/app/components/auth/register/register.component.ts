import { DatabaseService } from './../../../services/database.service';
import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
import { User } from 'src/app/models/user.model';

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnDestroy {

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
    terms: [true, [Validators.required]]
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  public userSubscription: Subscription;
  public categorySubscription: Subscription;

  public formSubmitted = false;

  public user: User = {
    uid: '',
    displayName: '',
    email: '',
    agree: true,
    role: 'USER',
    google: false
  };

  public googleButton = false;
  public confirmButton = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dB: DatabaseService
  ) { }


  ngOnDestroy(): void {

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }

  }

  // Form - Validator

  noValidPasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          noEsigual: true
        });
      }
    };
  }

  notValidField(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  agreeTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  // User

  createUser() {
    this.formSubmitted = true;

    const value = this.registerForm.value;

    // console.log(value);

    const { name, lastName, email } = value;

    this.user.displayName = name + ' ' + lastName;
    this.user.email = email;

    // console.log(this.registerForm.value);

    if (!this.registerForm.valid || value.terms === false) {
      // console.log('no valid');
      return;
    } else {
      this.confirmButton = true;



      this.authService.registerUser(value.email, value.password)
        .then(data => {
          this.user.uid = data.user['uid'];


          this.userSubscription = this.dB.saveUser(this.user)
            .subscribe((user: User) => {
              this.userService.reloadUser();
              this.categorySubscription = this.firstCategoriesSave(user.uid).subscribe((categories: any[]) => {
                console.log(categories);
                if (!categories) {
                  ('no hay')
                  const categoriesUser = ['Alquiler', 'Transporte', 'Servicios', 'Comida', 'Ocio', 'Ropa'];
                  this.dB.saveCategories(categoriesUser, user.uid);
                  this.router.navigateByUrl('/home');
                } else {
                  console.log('si hay');
                  this.router.navigateByUrl('/home');
                }

              }, err => {
                console.log('hubo un error');
                this.googleButton = false;
                return false
              });
            })
        })

        .catch(err => {
          this.confirmButton = false;

          Swal.fire('Error', err.message, 'error');
        });
    }
  }



  loginWithGoogle() {

    this.googleButton = true;

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

        this.dB.saveUser(userGoogle);

        this.dB.lastLogin(uid);

        this.categorySubscription = this.firstCategoriesSave(userGoogle.uid).subscribe((categories: any[]) => {
          if (!categories) {
            const categoriesUser = ['Alquiler', 'Transporte', 'Servicios', 'Comida', 'Ocio', 'Ropa'];
            this.dB.saveCategories(categoriesUser, uid);
            this.userService.reloadUser();
            this.router.navigateByUrl('/home');
          } else {
            this.userService.reloadUser();
            this.router.navigateByUrl('/home');
          }

        }, err => {
          console.log('hubo un error');
          this.googleButton = false;
          return false
        });



      })
      .catch(err => {
        console.error(err);
        this.googleButton = false;
      })
  }


  firstCategoriesSave(uid: string) {
   
    return this.dB.getCategories(uid);

  }


}


