import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddCarDetailsService } from 'src/app/admin/service/add-car-details.service';
import { CarRentService } from 'src/app/service/car-rent.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  

  constructor(private _router:Router,
    private _formBuilder: FormBuilder,
    private _carDetailsService: AddCarDetailsService,
    private route: ActivatedRoute,
    private _coreService:CoreService,
    private _carBookingService : CarRentService){}
  

  

     carRentalLocations !: any[];
     filteredCarRentalLocations !: any[];
     searchQuery: string = '';

  ngOnInit(): void {
    this.getCarDetailsList();
  }

  getCarDetailsList(){
    this._carDetailsService.getCarRentalDetailsList().subscribe({
      next:(res:any)=>{
        this.carRentalLocations = res;
        this.filteredCarRentalLocations = [...this.carRentalLocations];
      
      },error: console.log,
    });
  }

  filterCarRentalLocations(searchQuery: string): void {
    this.filteredCarRentalLocations = this.carRentalLocations.filter(car =>
      car.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  viewCarRentallocation(locationId:number){
    this._carDetailsService.getCarRentalDetailsById(locationId).subscribe({
      next:(val:any)=>{
        console.log(val);
        this._router.navigate(['carRent/viewCarRentLocationByLocationId/',locationId]);
      },error:console.log,
    });
  }

  
}