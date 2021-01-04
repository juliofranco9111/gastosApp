import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fireStore: AngularFireDatabase) {

    console.log('fire base works');
   }
  

}
