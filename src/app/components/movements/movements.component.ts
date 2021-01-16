import { Movement } from 'src/app/models/movement.model';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { InfoService } from './../../services/info.service';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';


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

  public editMovement = this.fb.group({
    type: ['', Validators.required],
    amount: [0, Validators.required],
    category: ['',],
    id: ['0', Validators.required]
  });

  constructor(
    private dB: DatabaseService,
    private fb: FormBuilder,
    private infoService: InfoService
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.getMovements();
    setTimeout(() => {
      this.totals();
      this.loading = false;
    },1000)


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

  changeMonth(value: Number) {
    if (value != this.todayMonth) {
      this.newMovButton = false;
    } else {
      this.newMovButton = true;
    }

    this.subscription.unsubscribe();
    this.changedMonth = true;

    this.subscription = this.dB.getMovements(this.uid, value)
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
    return this.dB.getMovements(this.uid, this.todayMonth).subscribe((movements: any) => {

      if (!movements || movements.length === 0) {
        this.data = false;
        this.loading = false;
      } else {
        this.movements = movements;
        this.data = true;
      }
      this.getFilterMovements();
      this.totals()
    });
  }

  openModal(movement: Movement) {
    // console.log(movement);
    const { id, type, category, amount } = movement;
    this.selectedMovement = movement

    this.subscription = this.dB.getCategories(this.uid).subscribe((res: any) => {
      if (!res || res === null) {
        this.categories = [];
      } else {
        this.categories = Object.values(res)
      }
    }, err => console.log(err));

    this.editMovement.controls['amount'].setValue(amount);
    this.editMovement.controls['id'].setValue(id);
    this.editMovement.controls['type'].setValue(type);
    this.editMovement.controls['category'].setValue(category);
  }

  async updateMovement() {

    let movUpdated = this.editMovement.value;
    let id = movUpdated.id;
    this.todayMonth = this.date.getMonth();

    if (this.editMovement.controls['category'].value === 'otra') {
      movUpdated.category = this.category2;
    }
    
    if (this.editMovement.controls['category'].value === '') {
      this.editMovement.controls['category'].setValue(this.category2);
    }
    
    if (!this.categories.includes(movUpdated.category)) {
      this.dB.saveCategory(movUpdated.category, this.uid);
    }

    await this.dB.updateMovement(this.uid, id, this.todayMonth, movUpdated)
      .then(()=>{
        this.totals();
      })
      .catch(err => console.log(err));      
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
        this.dB.deleteMovement(this.uid, month, id);
        Swal.fire(
          'Eliminado',
          'El movimiento se ha borrado',
          'success'
        );
        this.totals();
      }
      
    });




  }

}
