import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../admin/core/core.service';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassComponent } from '../change-pass/change-pass.component';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {

 

  // Property to track whether the user is an admin (initialized as false).
  adminIn:boolean =false;
  loginForm: FormGroup;

  constructor(private _fb:FormBuilder, // Injecting the FormBuilder service to create and manage the FormGroup.
    private _loginService: LoginServiceService, // Injecting a custom LoginServiceService.
    private _dialogRef: MatDialogRef<LoginComponent>, // Injecting the MatDialogRef to handle the dialog.
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, // Injecting data passed to the dialog, if any.
    private _coreService: CoreService,  // Injecting a custom CoreService.
    private _router:Router // Injecting the Router service for route navigation.

    ){
// Create a FormGroup named 'loginForm' with form controls for username and password with appropriate validaitions.
    this.loginForm=this._fb.group({

      username:['',Validators.required],
      password:['',Validators.required],
    });
  }

  //when user clicks on login
  onLogin(){
    
    this._loginService.getuser().subscribe({
      next:(userDetails: any) => {

        const user = userDetails.find((a:any)=>{
          return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
        });

        //if user details are correct
        if (user) {
          this._coreService.openSnackBar('logged in succesfully');
          this._dialogRef.close(true);
          // Redirect to the home page 
          this._dialog.open(ChangePassComponent)
          //show log out button
          this._loginService.loggedIn= true; // Initialize as false
          this._loginService.user_name = user.username;
        

        } 
        else {
          // Password is incorrect or user not found
          this._coreService.openSnackBar('Inccorect password!');
          this._dialogRef.close(true);
          this._router.navigate(['/home']);
          this._loginService.loggedIn= false;
          this._loginService.adminIn= false;
         
        }
 
      },
      error: (err: any) => {
        console.error(err);
        
      }
  });
 
  }
  

  
  
  hide = true;

}
