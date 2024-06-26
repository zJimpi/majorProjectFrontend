import { Component, Inject } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/admin/core/core.service';
import { BookingTableService } from 'src/app/service/booking-table.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { ActivatedRoute } from '@angular/router';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';


@Component({
  selector: 'app-pkg-booking',
  templateUrl: './pkg-booking.component.html',
  styleUrls: ['./pkg-booking.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class PkgBookingComponent {

  userFormGroup!:FormGroup
  paymentFormGroup!:FormGroup

  hotelId!:number
  packageId!:number
  bookingDetails:any

  roomSelections:any[]=[];
  hotelSelections:any;
  roomDetails: any[] = [];
  hotelDetails : any;


  constructor(private _formBuilder: FormBuilder,
    private _hotelService:AddHotelService,
    private _packageService:AddPkgService,
    private _roomService:AddRoomService,
    private _bookingTableService:BookingTableService,
    private route: ActivatedRoute,
    private _coreService:CoreService,) {

    this.userFormGroup = this._formBuilder.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required],
      checkInDate:['',Validators.required]
        
    });
    this.paymentFormGroup =this._formBuilder.group({
        amount:0
    });
  }

  ngOnInit(): void {
    this.loadPackageDetails()
    this.roomSelections = history.state.roomSelections;
    this.hotelId = history.state.hotelId;
    this.fetchRoomDetails();
    this.fetchHotelDetails();
  }

  loadPackageDetails(){
      // Get the hotelId from the route params
    this.route.params.subscribe(params => {
      this.packageId= +params['packageId']; // '+' is for converting string to number
        // Fetch room details by hotelId
        console.log(this.packageId);
      this._packageService.getPackageById(this.packageId).subscribe(
        (res: any) => {
          this.bookingDetails=res;
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

  fetchHotelDetails() {
    this._hotelService.getHotelById(this.hotelId).subscribe(
      (details: any) => {
        this.hotelDetails = details;
        console.log(this.hotelDetails); 
      },
      error => {
        console.error('Error fetching hotel details:', error);
      }
    );
  } 
  


  bookPackage(){
    const roomTypes: number[] = [];
    const noOfRooms: number[] = [];
    
    this.roomSelections.forEach(selection => {
      roomTypes.push(selection.roomId);
      noOfRooms.push(selection.noRooms);
    });

    const checkInDate = this.userFormGroup.value.checkInDate 
    ? new Date(this.userFormGroup.value.checkInDate)
    : new Date();
    checkInDate.setDate(checkInDate.getDate() + 1);
    const formattedCheckInDate = checkInDate.toISOString().split('T')[0];
    console.log(formattedCheckInDate);

    const packageDuration = this.bookingDetails.packageDuration; 
    const numberOfNights = parseInt(packageDuration.split(' ')[0]);
    const checkOutDate = new Date(checkInDate.getTime());
    checkOutDate.setDate(checkOutDate.getDate() + numberOfNights);
    const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];
    console.log("Check-out Date:", formattedCheckOutDate);
    console.log(this.bookingDetails.pckgId);
    console.log(this.hotelDetails.hotelId);

    const formData = {
      
      userName: this.userFormGroup.value.userName,
      packageId:this.bookingDetails.pckgId,
      adults: this.userFormGroup.value.adults,
      child: this.userFormGroup.value.child,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      
      roomIds: roomTypes,
      noOfRooms: noOfRooms,
      hotelId: this.hotelId 
    };

    console.log(formData);
    this._bookingTableService.addBookingTable(formData).subscribe({

      next: (val: any) => {
        const bookingId = val.bookingId;
        this.priceCalculation(bookingId);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

    priceCalculation(bookingId:number) {
    let totalPrice = 0;

    // Iterate through each room detail
    const packageDuration = this.bookingDetails.packageDuration; 
    const numberOfNights = parseInt(packageDuration.split(' ')[0]); 

    // Iterate through each room detail
    this.roomDetails.forEach(roomDetail => {

      const dateDifference = numberOfNights; 
      const roomPrice = roomDetail.pricePerDay;
      const noRooms = roomDetail.noRooms;
      const roomTotalPrice = roomPrice * noRooms * dateDifference;

      totalPrice += roomTotalPrice;
    });
    totalPrice += this.bookingDetails.price

    this.paymentFormGroup.get('amount')?.setValue(totalPrice);
   
    this._bookingTableService.updatePriceByBookingId(bookingId,totalPrice).subscribe();
  }

  generateTicket(){
  
    this._coreService.openSnackBarWithConfirmation("You can view your booking details in user dashboard");
    
   }
}
