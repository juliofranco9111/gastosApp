import { template } from './../../helpers/help-template';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.signOut()
      .then(data => {
        this.router.navigateByUrl('/login');
      })
      .catch(err => console.log(err))
  }

  showHelp() {
    Swal.mixin({
      backdrop: true,
      confirmButtonText: 'Entendido <i class="fa fa-check"></i>',
      confirmButtonColor:'#398bf7',
      progressSteps: ['1', '2', '3', '4']
    }).queue(template)
  }

}
