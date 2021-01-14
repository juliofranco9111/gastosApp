import { Movement } from 'src/app/models/movement.model';
import { UserService } from 'src/app/services/user.service';
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
    type: ['', Validators.required],
    amount: [, Validators.required],
    category: ['', Validators.required],
    id: ['0', Validators.required]
  })

  public uid = localStorage.getItem('uid')

  public categories: any[] = [];

  public categorySubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dB: DatabaseService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.categorySubscribe.unsubscribe();
  }

  ngOnInit() {
    this.categorySubscribe = this.dB.getCategories(this.uid).subscribe((res) => {

      if (!res || res === null) {
        this.categories = [];
      } else {
        // console.log(res);
        //console.log(Object.values(res));
        this.categories = Object.values(res)
      }
    });
  }

  saveNewMovement() {

    const date = new Date;
    const id = date.getTime().toString();
    const data: Movement = this.newMovement.value;
    const category: string = this.newMovement.value.category;

    const month = date.getMonth();

    if (!this.categories.includes(category)) {
      
      this.dB.saveCategory(this.newMovement.value.category, this.uid);
    }

    data.id = id;

    this.dB.saveMovement(this.uid, id, month, data)
      .then(() => {
        //console.log('guardado!');
        this.router.navigateByUrl('/movements')
      })
      .catch(err => console.log(err));

  }

  cancel() {
    this.router.navigateByUrl('/movements');
  }



}
