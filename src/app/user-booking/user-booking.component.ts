import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit{

  packageBookingDetails !: any[];
  hotelBookingDetails !: any[];
  carBookingDetails !: any[];
  userDetails !: any;

  constructor(private _dialog: MatDialog,
    private _router:Router,
    public _loginService: LoginServiceService) 
  {}


  ngOnInit(): void {

    this.getUser();
    this.getHotelBookingDetails();
    this.getPackageBookingDetails();
    this.getCarBookingDetails();

  }

  logOut(){

   
    this._loginService.loggedIn = false;
    this._loginService.adminIn = false;

    this._router.navigate(['/home']);
    console.log(this._loginService.loggedIn)

  }

  getHotelBookingDetails(){

    this._loginService.getHotelBookingsByUsername(this._loginService.user_name).subscribe({
      next: (val :any)=>{
        this.hotelBookingDetails = val;
        console.log(this.hotelBookingDetails);

      },
      error: (err:any)=>{
        console.error(err);
      }
    });
  }

  getPackageBookingDetails(){

    this._loginService.getPackageBookingsByUsername(this._loginService.user_name).subscribe({
      next: (val :any)=>{
        this.packageBookingDetails = val;
        console.log(this.packageBookingDetails);

      },
      error: (err:any)=>{
        console.error(err);
      }
    });
  }

  getCarBookingDetails(){

    this._loginService.getCarBookingsByUsername(this._loginService.user_name).subscribe({
      next: (val :any)=>{
        this.carBookingDetails = val;
        console.log(this.carBookingDetails);

      },
      error: (err:any)=>{
        console.error(err);
      }
    });
  }

  getUser(){
    this._loginService.getuserByUsername(this._loginService.user_name).subscribe({
      next: (val :any)=>{

        this.userDetails= val;
        console.log(this.userDetails);
      },
      error: (err:any)=>{
        console.error(err);
      }
    });
  }

}
