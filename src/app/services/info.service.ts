import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {


  public info:any;
  public symbol: string;

  public uid = localStorage.getItem('uid')
  

  constructor(
    private dB: DatabaseService,
  ) { 
  
    this.dB.getInfo( this.uid ).subscribe((info:any) => {
      if (info) {
        this.info = info;
        this.symbol = this.info.symbol;
      } else {
        return null;
      }
    })
    
    
    
  }
 
  



}
