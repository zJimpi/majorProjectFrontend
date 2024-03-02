import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class HotelBookingComponent {

  userFormGroup:FormGroup 
 
  paymentFormGroup:FormGroup


 
  constructor(private _fb: FormBuilder) {
    this.userFormGroup= _fb.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required]
    });
    this.paymentFormGroup =_fb.group({
      amount:['']
    });


  }




}


