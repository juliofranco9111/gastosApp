import { UserService } from 'src/app/services/user.service';
import { MovementsService } from './../../services/movements.service';
import { Movement } from 'src/app/models/movement.model';
import { InfoService } from './../../services/info.service';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: []
})
export class MovementsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;

  public movements: Movement[] = [];
  public earnings = [];
  public expenses = [];
  public categories = [];

  public totalEarnings = 0;
  public totalExpenses = 0;
  public balance = 0;

  public loading = true;
  public data = false;
  public info = true;
  public newMovButton = true;
  public changedMonth = false;

  public date = new Date;
  public todayMonth = this.date.getMonth();

  public balanceClass = 'success';
  public user: User;
  public category2 = '';
  public symbol = this.infoService.symbol;

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

  public newMonths = [];



  
  constructor(
    private userService: UserService,
    private dB: DatabaseService,
    private infoService: InfoService,
    private movementService: MovementsService,
  ) { }

  ngOnDestroy() {
    if (this.info || this.data) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {

    
    this.user = this.userService.user;
    

    this.subscription = this.dB.getMonthsMovements(this.user.uid).subscribe(months => {
      if (months) {
        for (let i = 0; i < months.length; i++) {
          this.newMonths.push(this.months[months[i]]);
        }
      }
    });
    
    this.subscription = this.getMovements().subscribe((movements: any) => {

      if (!movements || movements.length === 0) {
        this.data = false;
        this.loading = false;
      } else {
        this.movements = movements;
        this.data = true;
        this.getFilterMovements();
        this.totals()

        if (!this.infoService.info) {
          this.info = false;
        } else {
          this.info = true;
        }
      }
    }); 
    
    setTimeout(() => {
      this.loading = false;
    }, 1000)
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

    if (this.info) {
      const percent50 = (((this.movements[0].amount * 50) / 100));
      const percent20 = (((this.movements[0].amount * 20) / 100));
      this.balance = this.totalEarnings - this.totalExpenses;

      if (this.balance <= percent50 && this.balance > percent20) {
        this.balanceClass = 'warning'
      } else if (this.balance <= percent20) {
        this.balanceClass = 'danger'
      } else {
        this.balanceClass = 'success'
      }
    }
  }

  changeMonth(val: string) {


    let value = parseInt(val);

    if (this.todayMonth != 0) {
      value = value + 1;
    }

    if (value != this.todayMonth) {
      this.newMovButton = false;
    } else {
      this.newMovButton = true;
    }

    this.changedMonth = true;

    this.subscription = this.dB.getMovements(this.user.uid, value )
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
      });

    this.getFilterMovements();
    this.totals();

  }

  getMovements() {
    return this.dB.getMovements(this.user.uid, this.todayMonth)
  }


  deleteMovement(movement: Movement) {
    const { id, month } = movement;

    Swal.fire({
      title: '¿Esta seguro de eliminar el movimiento?',
      text: "Ésta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dB.deleteMovement(this.user.uid, month, id);
        Swal.fire(
          'Eliminado',
          'El movimiento se ha borrado',
          'success'
        );
      }

      this.totals();

    });
  }

}
