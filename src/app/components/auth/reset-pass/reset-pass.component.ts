import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styles: [
  ]
})
export class ResetPassComponent implements OnInit {

  public email = 'julio.franco9111@gmail.com';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  sendEmailResetPassword() {
    console.log('enviado');
    this.authService.passwordReset(this.email).then( data => console.log(data) ).catch(err => console.error(err));
  }

}
