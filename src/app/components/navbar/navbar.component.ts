import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    console.log('out');
    this.authService.signOut()
      .then(data =>{
        localStorage.removeItem('uid');
        this.router.navigateByUrl('/login');
      })
      .catch( err => console.log(err) )
  }

}
