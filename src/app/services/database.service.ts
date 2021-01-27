import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Movement } from '../models/movement.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';




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

  

  getMovements(uid: string, month: Number) {
    return this.dB.list(`users/${uid}/movements/${month}`).valueChanges();
  }

  getMovementById(uid: string, month: Number, id: string) {
    return this.dB.object(`users/${uid}/movements/${month}/${id}`).valueChanges()
      .pipe(map((movement: Movement) => movement))
  }

  saveMovement(uid: string, id: string, month: Number, data: Movement) {

    return this.dB.object(`users/${uid}/movements/${month}/${id}`).set(data);
  }
  updateMovement(uid: string, id: string, month: Number, data: Movement) {

    const itemRef = this.dB.object(`users/${uid}/movements/${month}/${id}`).update(data);
    return itemRef;
  }

  deleteMovement(uid: string, month: Number, id: string) {
    
    return this.dB.object(`users/${uid}/movements/${month}/${id}`).remove()
  }

  //Categories

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


}
