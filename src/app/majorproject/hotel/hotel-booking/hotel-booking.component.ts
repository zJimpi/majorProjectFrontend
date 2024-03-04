import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';


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
export class HotelBookingComponent implements OnInit{

  userFormGroup:FormGroup 
 
  paymentFormGroup:FormGroup

  hotelId!:number
  bookingDetails:any

  roomTypes = ['Standard Room', 'Suite', 'Family Room', 'Accessible Room'];



 
  constructor(private _fb: FormBuilder,
    private _hotelService:AddHotelService,
    private route: ActivatedRoute,
    ) {

      
    this.userFormGroup= _fb.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required],
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      roomTypes:['',Validators.required],
    });
    this.paymentFormGroup =_fb.group({
      amount:['']
    });
    
  }

  ngOnInit(): void {
    this.loadHotelAndRoomDetails()
  }

  loadHotelAndRoomDetails(){
    // Get the hotelId from the route params
    this.route.params.subscribe(params => {
      this.hotelId= +params['hotelId']; // '+' is for converting string to number
      // Fetch room details by hotelId
      this._hotelService.getHotelById(this.hotelId).subscribe(
        (res: any) => {
          this.bookingDetails=res
          console.log(this.bookingDetails);
          
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    });
  }
  

  
}


