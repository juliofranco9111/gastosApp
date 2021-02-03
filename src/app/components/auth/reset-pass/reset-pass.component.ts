import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styles: [
  ]
})
export class ResetPassComponent implements OnInit {

  public email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
    }
  }

  sendEmailResetPassword() {

    
    console.log('enviado');
    this.authService.passwordReset(this.email).then(data => {
      console.log(data)
      Swal.fire('Enviado..', 'Hemos enviado un correo con instrucciones para restablecer tu contraseña', 'info');
      this.router.navigateByUrl('/login');
    }).catch(err => {
      console.error(err)
      Swal.fire('Error', err.message, 'error')
    });
  }

}
