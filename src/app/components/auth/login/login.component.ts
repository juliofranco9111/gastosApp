import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public formSubmitted = false;

  public remember = true;

  public emailUser: string;


  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private db: DatabaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {

      this.emailUser = this.loadStorage('email')
    }

  }

  logInWithEmailAndPassword() {
    
    this.formSubmitted = true;

    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    if (this.remember) {
      this.saveStorage('email', this.loginForm.value.email);
    } else if (localStorage.getItem('email')) {
      this.deleteStorage('email')
    }

    this.authService.logIn(email, password)
      .then((data:any) => {
        console.log(data)

        localStorage.setItem('uid', data.user.uid)
        
        this.router.navigateByUrl('/home')
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      })
  }

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
