import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: []
})
export class InfoComponent implements OnInit, OnDestroy {

  public edit = false;

  public subs: Subscription;

  public saved = false;

  public dayMonth = [];

  public info = {
    salary: 0,
    saving: true,
    day: 1,
    symbol: '$'
  };

  public uid = localStorage.getItem('uid')
  public firstMovement: Movement = {
    type: 'ingreso',
    amount: 0,
    category: 'Salario',
    id: ''
  };

  constructor(
    private dB: DatabaseService,
    private userService: UserService
  ) {



  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.daysMonth();
    this.subs = this.getInfo( this.uid ).subscribe((info: any) => {
      // console.log(info);
      if (info) {
        this.info = info;
      } 
    })

  }

  click() {
    this.edit = true;
  }

  saveChanges() {
    this.edit = false;
  }

  daysMonth() {

    for (let i = 1; i <= 31; i++) {
      this.dayMonth.push(i)
    }

  }

  saveInfo() {
    if (this.info.salary !== 0) {

      const date = new Date;
      const month = date.getMonth();

      
      
      this.dB.saveInfo(this.uid, this.info)
        .then(() => {
          //console.log('guardado!');
          this.firstMovement.amount = this.info.salary;
          this.firstMovement.id = month.toString()
          
          //console.log(this.firstMovement);
          this.dB.saveMovement(this.uid, this.firstMovement.id, month, this.firstMovement);
          this.saved = true;
        })
        .catch(err => console.log(err));
      setTimeout(() => {
        this.saved = false;
      },
        3000);

    } else {
      return
    }

  }

  getInfo( uid:string ) {
    
    return this.dB.getInfo(uid);
  }

}
