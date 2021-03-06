import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Movement } from '../models/movement.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private dB: AngularFireDatabase) {

  }

  //Info money

  saveInfo(uid: string, info: any): any {
    const itemRef = this.dB.object(`users/${uid}/info`).set(info);
    return itemRef;
  }

  getInfo(uid: string) {
    return this.dB.object(`users/${uid}/info`).valueChanges()
  }


  //Movements

  getMonthsMovements(uid: string, year:number) {
    return this.dB.object(`users/${uid}/movements/${year}/`).valueChanges().
      pipe(map(months => {
        if (months) {
          return Object.keys(months)
        }
      }));
  }

  getMovements(uid: string, month: Number, year: Number): Observable<any> {
    return this.dB.list(`users/${uid}/movements/${year}/${month}`).valueChanges();
  }

  getMovementById(uid: string, month: Number, year:Number, id: string) {
    return this.dB.object(`users/${uid}/movements/${year}/${month}/${id}`).valueChanges()
      .pipe(map((movement: Movement) => movement))
  }

  saveMovement(uid: string, id: string, month: Number,year: Number, data: Movement) {

    return this.dB.object(`users/${uid}/movements/${year}/${month}/${id}`).set(data);
  }
  updateMovement(uid: string, id: string, month: Number, year: Number, data: Movement) {

    const itemRef = this.dB.object(`users/${uid}/movements/${year}/${month}/${id}`).update(data);
    return itemRef;
  }

  deleteMovement(uid: string, month: Number, year:Number, id: string) {
    
    return this.dB.object(`users/${uid}/movements/${year}/${month}/${id}`).remove()
  }

  //Categories

  saveCategories( categories:any[] , uid:string ) {
    const itemRef = this.dB.object(`users/${uid}/categories`);
    itemRef.set(categories);
  }


  saveCategory(category: string, uid: string) {
    const itemRef = this.dB.list(`users/${uid}/categories`);
    itemRef.push(category);
  }

  getCategories(uid: string) {
    return this.dB.object(`users/${uid}/categories`).valueChanges();
  }

  // User

  saveUser(user: User) {
    this.dB.object(`users/${user.uid}/user`).set(user);
    return this.returnUserById(user.uid);
  }
  

  returnUserById(uid: string) {
    return this.dB.object(`users/${uid}/user`).valueChanges()
      .pipe(map((user: User) => user))
  }

  lastLogin(uid: string) {
    const date = new Date;
    const moment = date.getTime();

    const itemRef = this.dB.object(`users/${uid}/user/lastLogin/`).set(moment);
    return itemRef;
  }

  updateName(uid: string, name: string) {
    return this.dB.object(`users/${uid}/user/displayName/`).set(name);
  }

  updateEmail(uid: string, email: string) {
    return this.dB.object(`users/${uid}/user/email/`).set(email);
  }


}
