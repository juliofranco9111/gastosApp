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

  percents = [];

  public info = {
    salary: 0,
    saving: true,
    percent: 10,
    day: 1,
    symbol: '$'
  };

  public categories = [];

  public uid = localStorage.getItem('uid')
  public firstMovement: Movement = {
    type: 'ingreso',
    amount: 0,
    category: 'Salario',
    id: '',
    month: 0
  };

  public saveMovement: Movement = {
    type: 'gasto',
    amount: 0,
    category: 'Ahorro',
    id: '',
    month: 0
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
    for (let i = 1; i <= 40; i++) {
      if (i % 5 === 0) {
        this.percents.push(i);
      }
    }

    this.daysMonth();

    this.subs = this.getInfo(this.uid).subscribe((info: any) => {
      // console.log(info);
      if (info) {
        this.info = info;
      }
    });

    this.subs = this.dB.getCategories(this.uid)
      .subscribe((categories: any) => {
        this.categories = Object.values(categories);
      });
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
          this.firstMovement.id = month.toString();

          this.saveMovement.amount = (this.info.salary * this.info.percent) / 100;
          this.saveMovement.id = (month + 1).toString();

          for (let i = month; i <= 11; i++) {
            if (!this.info.saving) {
              this.firstMovement.month = i;
              this.dB.saveMovement(this.uid, this.firstMovement.id, this.firstMovement.month, this.firstMovement);
            } else {
              this.firstMovement.month = i;
              this.saveMovement.month = i;
              this.dB.saveMovement(this.uid, this.firstMovement.id, this.firstMovement.month, this.firstMovement);
              this.dB.saveMovement(this.uid, this.saveMovement.id, this.saveMovement.month, this.saveMovement);
            }
          }
          //console.log(this.firstMovement);

          if (!this.categories.includes('Salario')) {
            this.dB.saveCategory(this.firstMovement.category, this.uid);
          }

          if (!this.categories.includes('Ahorro')) {
            this.dB.saveCategory(this.saveMovement.category, this.uid);
          }

          this.saved = true;
          this.edit = false;
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

  getInfo(uid: string) {

    return this.dB.getInfo(uid);
  }

}
