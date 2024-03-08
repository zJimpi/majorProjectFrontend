import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddCarDetailsService } from 'src/app/admin/service/add-car-details.service';
import { CarRentService } from 'src/app/service/car-rent.service';

@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: ['./car-booking.component.css']
})
export class CarBookingComponent {

  carBookingFormGroup!:FormGroup;
  carLocation:any;
  location:any;
  locationId!:number
  carType:string[]=[
    '2 Wheeler',
    '4 Wheeler(4 seater)',
    '4 Wheeler(6 seater)',
    '4 Wheeler(8 seater)',
    '4 Wheeler(10 seater)',
    '4 Wheeler(12 seater)',
  ];
  acOrNonAc:string[]=[
    'AC',
    'Non-AC'
  ];
  constructor(private _router:Router,
    private _formBuilder: FormBuilder,
    private _carDetailsService: AddCarDetailsService,
    private route: ActivatedRoute,
    private _coreService:CoreService,
    private _carBookingService : CarRentService){

  this.carBookingFormGroup = _formBuilder.group({
    username:['',Validators.required],
    pickUpDate:['',Validators.required],
    dropOffDate:['',Validators.required],
    acOrNonAc:['',Validators.required],
    carType:['',Validators.required],
  });
  }

  ngOnInit(): void {
    this.loadCarLocationDetails();
  }

  loadCarLocationDetails()
  {
    this.route.params.subscribe(params => {
      this.locationId= +params['locationId'];
      this._carDetailsService.getCarRentalDetailsById(this.locationId).subscribe(
        (res: any) => {
          this.carLocation=res;
          this.location=res.location;
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    });
  }

  bookCar(){
    const formData = {

      username : this.carBookingFormGroup.value.username,
      pickUpDate : this.carBookingFormGroup.value.pickUpDate,
      dropOffDate : this.carBookingFormGroup.value.pickUpDate,
      acOrNonAc : this.carBookingFormGroup.value.pickUpDate,
      carType : this.carBookingFormGroup.value.pickUpDate,
      location : this.carLocation.location
    }

    this._carBookingService.addCarBooking(formData).subscribe({

      next: (val: any) => {
        const bookingId = val.bookingId;
        this._coreService.openSnackBar("car Reserved Successfully");
      },
    });
  }
}
