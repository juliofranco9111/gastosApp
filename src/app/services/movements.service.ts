import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from './database.service';
import { Movement } from 'src/app/models/movement.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {  

  public movements: Movement[] = [];
  public categories = [];
  
  
  constructor(
    private dB: DatabaseService,
    
  ) { 
    console.log('movements');

  }

  getMovements(uid: string, month: Number, year:Number) {
    return this.dB.getMovements(uid, month, year);
  }

  getCategories(uid: string) {
    return this.dB.getCategories(uid);
  }


  
}
