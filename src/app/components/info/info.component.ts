import { User } from 'src/app/models/user.model';
import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Movement } from 'src/app/models/movement.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { rejects } from 'assert';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: []
})
export class InfoComponent implements OnInit, OnDestroy {

  public subs: Subscription;

  public saved = false;


  public dayMonth = [];
  percents = [];
  public categories = [];

  public info = {
    salary: 0,
    saving: true,
    percent: 10,
    day: 1,
    symbol: '$'
  };

  public uid = this.userService.user.uid;
  public user = this.userService.user;

  public firstMovement: Movement = {
    type: 'ingreso',
    amount: 0,
    category: 'Salario',
    id: '',
    month: 0,
    comment: ''
  };

  public saveMovement: Movement = {
    type: 'gasto',
    amount: 0,
    category: 'Ahorro',
    id: '',
    month: 0,
    comment: ''
  };

  public loading = true;


  constructor(
    private dB: DatabaseService,
    private userService: UserService,
    private router: Router
  ) {



  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs = this.getInfo(this.uid).subscribe((info: any) => {
      if (!info || info === null) {
        return
      } else {
        this.info = info;
      }
    });

    for (let i = 1; i <= 40; i++) {
      if (i % 5 === 0) {
        this.percents.push(i);
      }
    }

    this.daysMonth();

    this.subs = this.dB.getCategories(this.uid)
      .subscribe((categories: any) => {
        if (categories) {
          this.categories = Object.values(categories);
        }
      });

    setTimeout(() => {      
      this.loading = false;
    }, 1000);


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


          Swal.fire(
            {
              title: '¿Querés crear movimientos de salario y ahorro?',
              icon: 'question',
              allowEnterKey: true,
              allowOutsideClick: false,
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonText: 'Si, crear automáticamente movimientos para cada mes.',
              confirmButtonColor: '#3085d6',
              cancelButtonText: 'No, prefiero crear cada movimiento manualmente.',
              cancelButtonColor: '#d33',

            }
          ).then(result => {

            if (result.isConfirmed) {

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

              if (!this.categories.includes('Salario')) {
                this.dB.saveCategory(this.firstMovement.category, this.uid);
              }

              if (!this.categories.includes('Ahorro')) {
                this.dB.saveCategory(this.saveMovement.category, this.uid);
              }

              Swal.fire(
                'Guardado',
                'Se ha guardado tu información y se crearon movimientos',
                'success'
              )
                .then(() => this.router.navigateByUrl('/home'))
                .catch(err => console.error(err));
            } else {
              Swal.fire(
                'Guardado!',
                'Se ha guardado tu información',
                'success'
              )
                .then(() => this.router.navigateByUrl('/home'))
                .catch(err => console.error(err));
            }

          }).catch(rejects => {
            return;
          });





        })
        .catch(err => console.log(err));
      /* setTimeout(() => {
        this.saved = false;
        this.router.navigateByUrl('/home')
      }, 4500); */
    } else {
      return
    }



  }

  getInfo(uid: string) {

    return this.dB.getInfo(uid);
  }

}
