import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../../services/database.service';

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

  constructor(private dB: DatabaseService) {



  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.daysMonth();
    this.subs = this.getInfo().subscribe((info: any) => {
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

      this.dB.saveInfo(this.info)
        .then(() => {
          console.log('guardado!');
          this.saved = true;
        })
        .catch(err => console.log(err));
      setTimeout(() => {
        this.saved = false;
      }, 5000);

    } else {
      return
    }

  }

  getInfo() {
    return this.dB.getMovements();
  }

}
