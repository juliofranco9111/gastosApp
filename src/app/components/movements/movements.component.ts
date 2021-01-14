import { Movement } from 'src/app/models/movement.model';
import { UserService } from 'src/app/services/user.service';
import { FormsModule } from '@angular/forms';
import { InfoService } from './../../services/info.service';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: []
})
export class MovementsComponent implements OnInit, OnDestroy {


  public MovementsSubscription: Subscription;
  public movements = [];
  public data = false;
  public loading = true;

  public totalEarnings = 0;
  public totalExpenses = 0;
  public balance = 0;

  public earnings = [];
  public expenses = [];

  public newMovButton = true;

  public edit = false;

  public changedMonth = false;

  public todayMonth: Number;

  public months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'];

  public uid = localStorage.getItem('uid');


  constructor(
    private dB: DatabaseService,
    private userService: UserService,
    private infoService: InfoService
  ) {

  }

  ngOnDestroy() {
    this.MovementsSubscription.unsubscribe();
  }

  ngOnInit() {
    const date = new Date;
    this.todayMonth = date.getMonth();
    this.MovementsSubscription = this.dB.getMovements(this.uid, this.todayMonth).subscribe((movements: any) => {

      if (!movements || movements.length === 0) {
        this.data = false;
        this.loading = false;
      } else {
        this.movements = movements;

        this.getFilterMovements();
        this.totals();
        this.data = true;
        this.loading = false;
      }
    });

  }

  getFilterMovements() {
    this.expenses = this.movements.filter(movement => movement.type === 'gasto');
    this.earnings = this.movements.filter(movement => movement.type === 'ingreso');
  }

  totals() {

    this.earnings.forEach(mov => {
      this.totalEarnings += mov.amount;
    });

    this.expenses.forEach(mov => {
      this.totalExpenses += mov.amount;
    });

    this.getBalance();
  }

  getBalance() {
    this.balance = this.totalEarnings - this.totalExpenses;
  }

  click() {
    this.edit = true;
  }

  updateMovement(movement: Movement) {
    console.log('updated');

    console.log(movement);

    this.edit = false;
  }

  changeMonth(value: Number) {
    const date = new Date;
    const currentMonth = date.getMonth()

    if (value != currentMonth) {
      this.newMovButton = false;
    } else {
      this.newMovButton = true;
    }

    this.MovementsSubscription.unsubscribe();

    this.changedMonth = true;

    this.MovementsSubscription = this.dB.getMovements(this.uid, value)
      .subscribe((movements: Movement[]) => {
        if (!movements || movements.length === 0) {
          this.data = false;
          this.changedMonth = false;

        } else {
          this.movements = movements;
          this.changedMonth = false;
          this.data = true;
        }
      }, err => {
        console.log(err);
      })
  }

}
