import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from './database.service';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {


  public info:any;
  public symbol: string;

  public uid = localStorage.getItem('uid')
  

  constructor(
    private dB: DatabaseService,
    private userService: UserService
  ) { 
  
    this.dB.getInfo( this.uid ).subscribe((info:any) => {
      this.info = info;

      this.symbol = this.info.symbol;
    })
    
    
    
  }
 
  



}
