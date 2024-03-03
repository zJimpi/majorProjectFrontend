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
  

 

  constructor(private _dialog: MatDialog,
    private _router:Router,
    public _loginService: LoginServiceService) 
  {}


  ngOnInit(): void {

  }

  logOut(){
    // Set the properties to false to indicate that the user is no longer logged in.
   
    this._loginService.loggedIn = false;
    this._loginService.adminIn = false;

    //  // Navigate to the '/home' route
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
           // Update the  properties in the component based on the values from the LoginServiceService.
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

}