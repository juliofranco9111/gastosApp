import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Movement } from 'src/app/models/movement.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-movement',
  templateUrl: './edit-movement.component.html',
  styles: [
  ]
})
export class EditMovementComponent implements OnInit, OnDestroy{

  public idMovement: string;
  public uid: string;



  public monthMovement: Number;

  public subscription: Subscription;

  public categories = [];
  public category2 = '';

  public loading = true;
  public updateLoading = false;

  public editMovement = this.fb.group({
    type: ['', Validators.required],
    amount: [0, Validators.required],
    category: ['',],
    id: ['0', Validators.required],
    comment: ['', Validators.maxLength(50)]
  });

  public selectedMovement: Movement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    public dB: DatabaseService,
    private _location: Location

  ) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  ngOnInit(): void {

    this.uid = this.userService.user.uid;

    this.idMovement = this.activatedRoute.params['value'].id;
    this.monthMovement = this.activatedRoute.params['value'].month;
    
    this.subscription = this.dB.getMovementById(this.uid, this.monthMovement, this.idMovement)
      .subscribe(movement => {        
        this.selectedMovement = movement;

        const { id, type, category, amount, comment } = this.selectedMovement;

        this.editMovement.controls['amount'].setValue(amount);
        this.editMovement.controls['id'].setValue(id);
        this.editMovement.controls['type'].setValue(type);
        this.editMovement.controls['category'].setValue(category);
        this.editMovement.controls['comment'].setValue(comment);

      })

    this.subscription = this.dB.getCategories(this.uid).subscribe((res: any) => {
      if (!res || res === null) {
        this.categories = [];
      } else {
        this.categories = Object.values(res);
      }
    }, err => console.log(err));

    setTimeout(() => {
      this.loading = false;
    }, 800);
  }

  updateMovement() {

    this.updateLoading = true;
     
    

    if (this.editMovement.controls['category'].value === 'otra' && this.category2.length < 1) {
      // console.log('holi');
      this.updateLoading = false;
      return;
    } else {
      if (this.editMovement.controls['category'].value === 'otra') {
        this.editMovement.controls['category'].setValue(this.category2);
        if (!this.categories.includes(this.category2)) {      
          this.dB.saveCategory(this.category2, this.uid);
        };
      }
      // console.log('hola');
      this.dB.updateMovement(this.uid, this.idMovement, this.monthMovement, this.editMovement.value)
      .then(() => {
        this.updateLoading = false;
        this._location.back();
      })
      .catch(err => console.log(err));
    }
  }
    
  }




  