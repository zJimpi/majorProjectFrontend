import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { Router } from '@angular/router';
import { CoreService } from './admin/core/core.service';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './service/login-service.service';
import { RestPasswordComponent } from './rest-password/rest-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'Wander Quest';
  // This boolean variable is used to track whether a user is logged in or not. Initially set to false.
  loggedIn:boolean =false;
  // This boolean variable is used to track whether the logged-in user is an admin. Initially set to false.
  adminIn:boolean = false;

 

  //  services are injected as dependencies.
  constructor(private _dialog: MatDialog,// Injecting the MatDialog service for displaying dialogs.
    private _coreService: CoreService,// Injecting a custom CoreService.
    private _router:Router,// Injecting the Router service for navigating between routes.
    private _loginService: LoginServiceService // Injecting a custom LoginServiceService.

    ){}

    user:string='';


  //to open a signup form dialog.
  openSignupForm(){
    //open by component
    const dialogRef = this._dialog.open(SignupComponent)
    //when colse button is clicked
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._router.navigate(['/home']);
          
        }
      },
    });
  }



  //to open a Login form dialog.
  openLoginForm(){
    //open by component
    const dialogRef = this._dialog.open(LoginComponent)
    //when colse button is closed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
           // Update the  properties in the component based on the values from the LoginServiceService.
          this.adminIn = this._loginService.adminIn;
          this.loggedIn = this._loginService.loggedIn;
          this.user=this._loginService.user_name;
        }
      },
    });
  }

  

  // This method is used to log the user out of the application.
  logOut(){
    // Set the properties to false to indicate that the user is no longer logged in.
    this.loggedIn = false;
    this.adminIn=false;
     // Navigate to the '/home' route
    this._router.navigate(['/home']);

  }

  refreshPageWithReload() {
    location.reload(); // Reload the current page
  }
  
  
  
  //reset password
  openResetPass(){
    //open by component
    const dialogRef = this._dialog.open(RestPasswordComponent)
    //when colse button is closed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
           // Update the  properties in the component based on the values from the LoginServiceService.
          this.adminIn = this._loginService.adminIn;
          this.loggedIn = this._loginService.loggedIn;
          this.user=this._loginService.user_name;
          
        }
      },
    });
  }
    
  //reset password


}
