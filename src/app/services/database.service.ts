import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private dB: AngularFireDatabase) {

  }

  saveInfo(info: any): any {
    const itemRef = this.dB.object(`usuarios/usuarioejemplo/info`).set(info);
    return itemRef;
  }

  getMovements() {
    return this.dB.object(`usuarios/movimientos/01`).valueChanges();
  }
  
  saveMovement(id: string, data) {

    return this.dB.object(`usuarios/usuarioejemplo/movimientos/${ id }`).set(data);
  }

  saveCategory(category: string) {
    const itemRef = this.dB.list(`usuarios/usuarioejemplo/categorias`);
    itemRef.push(category);
  }

  getCategories() {
    return this.dB.object(`usuarios/usuarioejemplo/categorias`).valueChanges();
  }


}
