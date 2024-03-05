import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { HotelBookingService } from 'src/app/service/hotel-booking.service';


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

  roomSelections:any[]=[]
  roomDetails: any[] = [];

  constructor(private _fb: FormBuilder,
    private _hotelService:AddHotelService,
    private _roomService:AddRoomService,
    private route: ActivatedRoute,
    private _coreService:CoreService,
    private _hotelBooking:HotelBookingService
    ) {

      
    this.userFormGroup= _fb.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required],
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      
    });
    this.paymentFormGroup =_fb.group({
      amount:['']
    });
    
  }

  ngOnInit(): void {
    this.loadHotelAndRoomDetails()
    this.roomSelections = history.state.roomSelections;
    this.fetchRoomDetails()
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
          console.log(this.roomSelections);
          
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    });
  }
  
  fetchRoomDetails() {
    this.roomSelections.forEach(roomSelection => {
      this._roomService.getRoomById(roomSelection.roomId).subscribe(
        (details: any) => {
          this.roomDetails.push({ ...details, noRooms: roomSelection.noRooms });
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    });
  }
  
  bookHotel(){
    const roomTypes: number[] = [];
    const noOfRooms: number[] = [];
  
    this.roomSelections.forEach(selection => {
      roomTypes.push(selection.roomId);
      noOfRooms.push(selection.noRooms);
    });
  
    const formData = {
      userForm: this.userFormGroup.value,
      roomTypes: roomTypes,
      noOfRooms: noOfRooms,
      hotelId: this.hotelId 
    };

    this._hotelBooking.addHotelBooking(formData).subscribe({
            
      next: (val: any) => {
        this._coreService.openSnackBar('Hotel booked successfully');
        console.log(this.userFormGroup)
        
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  
  priceCalculation(){

  }
}


