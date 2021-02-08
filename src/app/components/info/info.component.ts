import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Movement } from 'src/app/models/movement.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: []
})
export class InfoComponent implements OnInit, OnDestroy {

  public subs: Subscription;

  public saved = false;
  public buttonLoad = false;


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
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.daysMonth();

    const verifyUser = setInterval(() => {
      if (this.userService.user.uid) {
        this.user = this.userService.user;
        this.initSubscriptions()
        clearInterval(verifyUser)
      }

    }, 100);
  }

  initSubscriptions() {
    this.subs = this.getInfo(this.user.uid).subscribe((info: any) => {
      if (!info || info === null) {
        return
      } else {
        this.info = info;
      }
    }, err => { return false });

    for (let i = 1; i <= 40; i++) {
      if (i % 5 === 0) {
        this.percents.push(i);
      }
    }
    this.subs = this.dB.getCategories(this.user.uid)
      .subscribe((categories: any) => {
        if (categories) {
          this.categories = Object.values(categories);
        }
      }, err => { return false });

    this.loading = false;
  }


  daysMonth() {

    for (let i = 1; i <= 31; i++) {
      this.dayMonth.push(i)
    }

  }

  saveInfo() {
    this.buttonLoad = true;
    if (this.info.salary !== 0) {

      const date = new Date;
      const month = date.getMonth();

      this.dB.saveInfo(this.user.uid, this.info)
        .then(() => {

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
                  this.dB.saveMovement(this.user.uid, this.firstMovement.id, this.firstMovement.month, this.firstMovement);
                } else {
                  this.firstMovement.month = i;
                  this.saveMovement.month = i;
                  this.dB.saveMovement(this.user.uid, this.firstMovement.id, this.firstMovement.month, this.firstMovement);
                  this.dB.saveMovement(this.user.uid, this.saveMovement.id, this.saveMovement.month, this.saveMovement);
                }
              }

              if (!this.categories.includes('Salario')) {
                this.dB.saveCategory(this.firstMovement.category, this.user.uid);
              }

              if (!this.categories.includes('Ahorro')) {
                this.dB.saveCategory(this.saveMovement.category, this.user.uid);
              }

              Swal.fire(
                'Guardado',
                'Se ha guardado tu información y se crearon movimientos',
                'success'
              )
                .then(() => {
                  this.buttonLoad = false;
                  this.router.navigateByUrl('/home')
                })
                .catch(err => {
                  this.buttonLoad = false;
                });
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
            this.buttonLoad = false;
            return;
          });

        })
        .catch(err => {
          this.buttonLoad = false;
        });

    } else {
      return
    }



  }

  getInfo(uid: string) {

    return this.dB.getInfo(uid);
  }

}
