import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: []
})
export class InfoComponent implements OnInit {

  public edit = false;

  public saved = false;

  public dayMonth = [];

  public info = {
    salary: 0,
    saving: true,
    day: 1,
    symbol: '$'
  };

  constructor(private database: DatabaseService) {

    if (localStorage.getItem('info')) {
      this.info = JSON.parse(localStorage.getItem('info'));
      console.log(this.info);
    } else {
      console.log(this.info);
    }
    
  }

  ngOnInit(): void {
    this.daysMonth();
  }

  click() {
    this.edit = true;
  }

  saveChanges() {
    this.edit = false;
  }

  daysMonth() {
    
    for (let i = 1; i <= 31; i++){
      this.dayMonth.push(i)
    }

  }

  saveInfo() {
    if ( this.info.salary !== 0 ) {
      localStorage.setItem('info', JSON.stringify(this.info));
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 5000);
    } else {
      localStorage.removeItem('info')
      return
    }
  }

}
