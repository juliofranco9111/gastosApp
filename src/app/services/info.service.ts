import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {


  public info: any;
  public symbol: string;

  public uid = '';


  constructor(
    private dB: DatabaseService,
    private userService: UserService
  ) {
    const verifyInfo = setInterval(() => {
      if (this.userService.user.uid) {
        this.uid = this.userService.user.uid;
        this.dB.getInfo(this.uid).subscribe((info: any) => {
          // console.log(info);
          if (info) {
            this.info = info;
            this.symbol = this.info.symbol;
            clearInterval(verifyInfo);
          };
        }, err => { return false });
      };
    }, 100);
  }



}






