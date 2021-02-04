import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [
  ]
})
export class UserCardComponent implements OnInit {

  public user: User;
  public name = '';
  public email = '';

  public edit = false;
  public disabled = true;
  
  constructor(
    private userService: UserService
    ) { }
    
    ngOnInit(): void {
      
      this.user = this.userService.user;
      this.email = this.user.email;
      this.name = this.user.displayName;
      
  }


  saveInfo() {
    this.userService.UpdateProfileName(this.name)
      .then(() => {
        return true;
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.name = this.user.displayName;
    });
    this.userService.UpdateProfileEmail(this.email)
      .then(() => {
        return true;
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', err.message, 'error');
        this.email = this.user.email;
      });

    this.edit = false;
    this.disabled = true;

  }

  editInfo() {
    this.edit = true;
    this.disabled = false;

    
  }

}