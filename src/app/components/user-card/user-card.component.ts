import { DatabaseService } from './../../services/database.service';
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
  public loadButton = false;
  public disabled = true;
  
  constructor(
    private userService: UserService,
    private dB: DatabaseService
    ) { }
    
    ngOnInit(): void {
      
      this.user = this.userService.user;
      this.email = this.user.email;
      this.name = this.user.displayName;
      
  }


  saveInfo() {
    this.loadButton = true;
    this.userService.UpdateProfileName(this.name)
      .then(() => {
        this.dB.updateName(this.user.uid, this.name)
          .then(() => {
            return true;
        })
        .catch(err => console.log(err))
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.name = this.user.displayName;
    });
    this.userService.UpdateProfileEmail(this.email)
      .then(() => {
        this.dB.updateEmail(this.user.uid, this.email)
          .then(() => {
            return true;
        })
        .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', err.message, 'error');
        this.email = this.user.email;
      });

    this.loadButton = false;
    this.edit = false;
    this.disabled = true;

  }

  editInfo() {
    this.edit = true;
    this.disabled = false;

    
  }

}
