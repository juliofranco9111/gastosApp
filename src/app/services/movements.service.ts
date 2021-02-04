import { Movement } from 'src/app/models/movement.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {  

  public movements: Movement[] = [];
  public earnings = [];
  public expenses = [];
  public categories = [];

  public totalEarnings = 0;
  public totalExpenses = 0;
  public balance = 0;

  public loading = true;
  public data = false;
  public newMovButton = true;
  public changedMonth = false;

  public date = new Date;
  public todayMonth = this.date.getMonth();

  public balanceClass = 'success';
  public uid = localStorage.getItem('uid');
  public category2 = '';

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
    'Diciembre'
  ];

  public selectedMovement: Movement;

  constructor() { 
    // console.log('servicioooo');
  }


  getFilterMovements() {
    this.expenses = this.movements.filter(movement => movement.type === 'gasto');
    this.earnings = this.movements.filter(movement => movement.type === 'ingreso');
  }

  totals() {

    this.totalEarnings = 0;
    this.totalExpenses = 0;

    this.earnings.forEach(mov => {
      this.totalEarnings += mov.amount;
    });
    this.expenses.forEach(mov => {
      this.totalExpenses += mov.amount;
    }); 
    this.getBalance();
  }

  getBalance() {
    const percent50 = (((this.movements[0].amount * 50) / 100));
    const percent20 = (((this.movements[0].amount * 20) / 100));
    this.balance = this.totalEarnings - this.totalExpenses;

    if (this.balance <= percent50 && this.balance > percent20) {
      this.balanceClass = 'warning'
    } else if (this.balance <= percent20) {
      this.balanceClass = 'danger'
    }
  }
}
