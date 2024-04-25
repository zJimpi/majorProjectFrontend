import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';
import { RestPasswordComponent } from '../rest-password/rest-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  loggedIn:boolean =false;
  //This boolean variable is used to track whether the logged-in user is an admin. Initially set to false.
  adminIn:boolean = false;
  user:string='';

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

  openResetPass(){
    //open by component
    const dialogRef = this._dialog.open(RestPasswordComponent)
    //when alose button is closed
    dialogRef.afterClosed().subscribe({
      next: (val : any) => {
        if (val) {
          this.adminIn = this._loginService.adminIn;
          this.loggedIn = this._loginService.loggedIn;
          this.user=this._loginService.user_name;
          
        }
      },
    });
  }

  openAdminPanel(){
    this._router.navigate(['/adminHome']);
  }

  getHotelBookingDetails(){

    this._loginService.getHotelBookingsByUsername(this.user).subscribe({
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

    this._loginService.getPackageBookingsByUsername(this.user).subscribe({
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

    this._loginService.getCarBookingsByUsername(this.user).subscribe({
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
    this._loginService.getuser(this._loginService.user_name,this._loginService.password).subscribe({
      next: (val :any)=>{

        this.userDetails= val;
        console.log(this.userDetails.email);
      },
      error: (err:any)=>{
        console.error(err);
      }
    });
  }
}