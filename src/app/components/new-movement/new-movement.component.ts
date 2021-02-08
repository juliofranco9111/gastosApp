import { User } from 'src/app/models/user.model';
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
    id: ['0', Validators.required],
    comment: ['',Validators.maxLength(300)]
  })

  public user: User;

  public loading = true;


  public categoryValidator = false;

  public categories: any[] = [];

  public category2 = '';

  public date = new Date;
  public year = this.date.getFullYear();

  public month = this.date.getMonth();

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

    const userVerify = setInterval(()=>{
      if(this.userService.user.uid){
        this.user = this.userService.user;
        console.log('hay user', this.user);
        clearInterval(userVerify);

        this.categorySubscribe = this.dB.getCategories(this.user.uid).subscribe((res) => {
          if (!res || res === null) {
            this.categories = [];
          } else {
            this.categories = Object.values(res)
          }
          this.loading = false;
        }, err => {
            this.loading = false;
        });
      }
    },200)

    
  }

  saveNewMovement() {

    const id = this.date.getTime().toString();
    
    const category = this.newMovement.controls['category'];


    if (category.value === 'otra' || category.value.length < 0) {
      
      if (this.category2.length === 0) {
        this.categoryValidator = true;
        return false;
      } else { 
        category.setValue(this.category2);
      }
      
    };
    
    if (!this.categories.includes(category.value)) {
      this.dB.saveCategory(category.value, this.user.uid);
    };

    
    const data: Movement = this.newMovement.value;
    data.id = id;
    data.month = this.month;


    this.dB.saveMovement(this.user.uid, id, this.month,this.year, data)
      .then(() => {
        this.router.navigateByUrl('/home')
      })
      .catch(err => console.log(err));
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }



}
