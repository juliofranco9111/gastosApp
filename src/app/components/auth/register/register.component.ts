import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnDestroy{

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

  public userSubscripction: Subscription;

  public formSubmitted = false;

  public user: User = {
    uid: '',
    name: '',
    lastName: '',
    email: '',
    agree: true
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userSevice: UserService
  ) { }


  ngOnDestroy(): void {
    if (this.userSubscripction) {
      this.userSubscripction.unsubscribe();
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

    this.user.name = name;
    this.user.lastName = lastName;
    this.user.email = email;

    // console.log(this.registerForm.value);

    if (!this.registerForm.valid || value.terms === false) {
      // console.log('no valid');
      return;
    } else {

      this.authService.registerUser(value.email, value.password)
        .then(data => {
          console.log('creado');
          console.log(data);
          this.user.uid = data.user['uid'];

          this.userSubscripction = this.userSevice.saveUser(this.user)
            .subscribe((user:any )=> {
              localStorage.setItem('uid', user.uid);

            }, err => console.log(err) )
          
          this.router.navigateByUrl('/home')
        }
        )
        .catch(err => {

          Swal.fire('Error', err.message, 'error');

        })
    }
  }







}
