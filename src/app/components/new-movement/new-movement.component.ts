import { DatabaseService } from './../../services/database.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: []
})
export class NewMovementComponent implements OnInit, OnDestroy {

  public newMovement = this.fb.group({
    type: ['',Validators.required],
    amount:[ , Validators.required],
    category: ['', Validators.required],
    id: ['0', Validators.required]
  })

  public categories: any[] = [];
  public categorySubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private dB: DatabaseService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.categorySubscribe.unsubscribe();
  }

  ngOnInit() {
    this.categorySubscribe = this.dB.getCategories().subscribe((res) => {

      if (!res || res === null) {
        this.categories = [];
      } else {
        // console.log(res);
        console.log(Object.values(res));
        this.categories = Object.values(res)
      }
    });
  }

  saveNewMovement() {   

    const date = new Date;
    const id = date.getTime().toString();

    const data = this.newMovement.value;
    const category:string = this.newMovement.value.category;
    
    if (!this.categories.includes(category) ) {
      console.log('no existe');
      this.dB.saveCategory(this.newMovement.value.category);
    }

    data.id = id;
    
    this.dB.saveMovement(id, data)
      .then(() => {
        console.log('guardado!');
        this.router.navigateByUrl('/movements')
      })
      .catch(err => console.log(err));  
    
  }

  cancel() {
    this.router.navigateByUrl('/movements');
  }

  

}
