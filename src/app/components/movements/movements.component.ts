import { InfoService } from './../../services/info.service';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

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

  public edit = false;
  

  constructor(
    private dB: DatabaseService,
    private infoService: InfoService
  ) {
    
   }

  ngOnDestroy() {
    this.MovementsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.MovementsSubscription = this.dB.getMovements().subscribe((movements: any) => {

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

  updateMovement( movement ) {
    console.log('updated');

    console.log(movement);

    this.edit = false;
  }

}
