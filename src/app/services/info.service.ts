import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {


  constructor(
    private dB: DatabaseService,
    private userService: UserService
  ) {
    
  }

  getInfo(uid: string) {    
    return this.dB.getInfo(uid);
  }



}






