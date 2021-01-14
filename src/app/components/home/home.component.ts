import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    
  }

}
