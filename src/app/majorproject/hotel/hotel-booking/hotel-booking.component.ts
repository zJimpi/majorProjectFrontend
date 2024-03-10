import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { BookingTableService } from 'src/app/service/booking-table.service';



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
  formData:any
  roomSelections:any[]=[]
  roomDetails: any[] = [];

  constructor(private _fb: FormBuilder,
    private _hotelService:AddHotelService,
    private _roomService:AddRoomService,
    private route: ActivatedRoute,
    private _coreService:CoreService,
    private _booking:BookingTableService
    ) {

      
    this.userFormGroup= _fb.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required],
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      
    });
    this.paymentFormGroup =_fb.group({
      amount:0
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
    
    const checkInDate = this.userFormGroup.value.checkInDate 
    ? new Date(this.userFormGroup.value.checkInDate)
    : new Date();
    const checkOutDate = this.userFormGroup.value.checkOutDate 
     ? new Date(this.userFormGroup.value.checkOutDate)
     : new Date();

// Set both check-in and check-out dates to the next day
    checkInDate.setDate(checkInDate.getDate() + 1);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    const formattedCheckInDate = checkInDate.toISOString().split('T')[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];
    
     this.formData = {
      
        userName: this.userFormGroup.value.userName,
        adults: this.userFormGroup.value.adults,
        child: this.userFormGroup.value.child,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
     
      roomIds: roomTypes,
      noOfRooms: noOfRooms,
      hotelId: this.hotelId 
    };
    console.log(this.formData);
    
    this._booking.addBookingTable(this.formData).subscribe({
            
      next: (val: any) => {
        const bookingId = val.bookingId;
        this.priceCalculation(bookingId)
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  
  priceCalculation(bookingId:number) {
    let totalPrice = 0;

    // Iterate through each room detail
    this.roomDetails.forEach(roomDetail => {
      // Calculate the date difference
      const checkInDate = new Date(this.userFormGroup.get('checkInDate')?.value);
      const checkOutDate = new Date(this.userFormGroup.get('checkOutDate')?.value);
      const dateDifference = ((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))+1; // Difference in days
      console.log(dateDifference);
      
      // Calculate the price for the current room
      const roomPrice = roomDetail.pricePerDay;
      const noRooms = roomDetail.noRooms;
      const roomTotalPrice = roomPrice * noRooms * dateDifference;
     
      // Add the current room's total price to the grand total
      totalPrice += roomTotalPrice;
    });

    // Update the total price in the form control
    this.paymentFormGroup.get('amount')?.setValue(totalPrice);
   
    this._booking.updatePriceByBookingId(bookingId,totalPrice).subscribe();
  }
  //tikit
  genrateTicket(){
  
   this._coreService.openSnackBarWithConfirmation("You can view your booking details in user dashboard");
   
  }
}


