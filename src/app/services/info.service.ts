import { DatabaseService } from './database.service';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService implements OnDestroy{


  public info:any;
  public symbol: string;
  

  constructor(
    private dB: DatabaseService
  ) { 
  
    this.dB.getInfo().subscribe((info:any) => {
      this.info = info;

      this.symbol = this.info.symbol;
    })
    
    
    
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  



}
