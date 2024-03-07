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
  hotelSelections:any[]=[];
  roomDetails: any[] = [];
  hotelDetails : any[] = [];


  constructor(private _formBuilder: FormBuilder,
    private _hotelService:AddHotelService,
    private _packageService:AddPkgService,
    private _roomService:AddRoomService,
    private _bookingTableService:BookingTableService,
    private route: ActivatedRoute,
    private _coreService:CoreService,) {

    this.userFormGroup= _formBuilder.group({
      userName:['',Validators.required],
      adults:['',Validators.required],
      child:['',Validators.required],
      checkInDate:['',Validators.required]
        
    });
    this.paymentFormGroup =_formBuilder.group({
        amount:0
    });
  }

  ngOnInit(): void {
    this.loadPackageDetails()
    this.roomSelections = history.state.roomSelections;
    this.hotelSelections = history.state.hotelSelections;
    this.fetchRoomDetails()
  }

  loadPackageDetails(){
      // Get the hotelId from the route params
    this.route.params.subscribe(params => {
      this.packageId= +params['packageId']; // '+' is for converting string to number
        // Fetch room details by hotelId
        console.log(this.packageId);
      this._packageService.getPackageById(this.packageId).subscribe(
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

  fetchHotelDetails() {
  this.hotelSelections.forEach(hotelSelection => {
    this._hotelService.getHotelById(hotelSelection.hotelId).subscribe(
      (details: any) => {
        this.hotelDetails.push(details);
        console.log(this.hotelDetails);
      },
      
      error => {
        console.error('Error fetching hotel details:', error);
      }
    );
  });
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

    const formData = {
      userForm: {
        userName: this.userFormGroup.value.userName,
        adults: this.userFormGroup.value.adults,
        child: this.userFormGroup.value.child,
        checkInDate: formattedCheckInDate,
      },
      roomTypes: roomTypes,
      noOfRooms: noOfRooms,
      hotelId: this.hotelId 
    };

    this._bookingTableService.addBookingTable(formData).subscribe({

      next: (val: any) => {
        const bookingId = val.bookingId;
        this._coreService.openSnackBar('Hotel booked successfully');
        
        // this.priceCalculation(bookingId)
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
        // const dateDifference = ((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))+1; // Difference in days
        // console.log(dateDifference);
        
        // Calculate the price for the current room
        const roomPrice = roomDetail.pricePerDay;
        const noRooms = roomDetail.noRooms;
        // const roomTotalPrice = roomPrice * noRooms * dateDifference;
       
        // Add the current room's total price to the grand total
        // totalPrice += roomTotalPrice;
      });
    }
}
