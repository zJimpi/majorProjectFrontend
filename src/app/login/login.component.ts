import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../admin/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  // Property to track whether the user is an admin (initialized as false).
  adminIn:boolean =false;
  loginForm: FormGroup;

  constructor(private _fb:FormBuilder, // Injecting the FormBuilder service to create and manage the FormGroup.
    private _loginService: LoginServiceService, // Injecting a custom LoginServiceService.
    private _dialogRef: MatDialogRef<LoginComponent>, // Injecting the MatDialogRef to handle the dialog.
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
  onLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
  
    this._loginService.getuser(username, password).subscribe({
      next: (userDetails: any) => {
        // console.log("User details:", userDetails);
        if (userDetails) {
          // console.log("User exists");
          this._loginService.checkAdmin(username, password).subscribe({
            next: (isAdmin: boolean) => {
              // console.log("Is admin:", isAdmin);
              if (isAdmin) 
              {
                this._coreService.openSnackBar('Admin logged in successfully');
                console.log(this._loginService.checkAdmin(username, password));
                this._dialogRef.close(true);
                // Redirect to the home page 
                this._router.navigate(['/home']);
                //show log out button
                this._loginService.adminIn= true; // Initialize as false
                this._loginService.loggedIn= true;
                // this._loginService.user_name = user.username;
              } 
              else 
              {
                this._coreService.openSnackBar('Logged in successfully');
                console.log(this._loginService.checkAdmin(username, password));
                this._dialogRef.close(true);
                // Redirect to the home page 
                this._router.navigate(['/home']);
                //show log out button
                this._loginService.adminIn= false;
                this._loginService.loggedIn= true; // Initialize as false
                // this._loginService.user_name = user.username;
              }
              this._dialogRef.close(true);
              this._router.navigate(['/home']);
              this._loginService.adminIn = isAdmin;
              this._loginService.loggedIn = true;
            },
            error: (err: any) => {
              console.error(err);
              this._coreService.openSnackBar('Incorrect username or password!');
              this._dialogRef.close(true);
              this._router.navigate(['/home']);
              this._loginService.loggedIn = false;
              this._loginService.adminIn = false;
            }
          });
        } 
        else 
        {
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
  // //when user clicks on login
  // onLogin(){
    
  //   const username = this.loginForm.value.username;
  //   const password = this.loginForm.value.password;

    
  //   this._loginService.getuser(username, password).subscribe({
  //     next:(userDetails: any) => {

  //       // const user = userDetails.find((a:any)=>{
  //       //   return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
  //       // });

  //       //if user details are correct
  //       if (userDetails) {
  //         //name of the user
          
  //         //checks for admin login
  //         if(this._loginService.checkAdmin(username, password))
  //         {
  //           this._coreService.openSnackBar(' Admin logged in succesfully');
  //           console.log(this._loginService.checkAdmin(username, password));
  //           this._dialogRef.close(true);
  //           // Redirect to the home page 
  //           this._router.navigate(['/home']);
  //           //show log out button
  //           this._loginService.adminIn= true; // Initialize as false
  //           this._loginService.loggedIn= true;
  //           // this._loginService.user_name = user.username;
  //         }

  //         //checks for normal user login
  //         else{
  //         this._coreService.openSnackBar('logged in succesfully');
          // console.log(this._loginService.checkAdmin(username, password));
          // this._dialogRef.close(true);
          // // Redirect to the home page 
          // this._router.navigate(['/home']);
          // //show log out button
          // this._loginService.adminIn= false;
          // this._loginService.loggedIn= true; // Initialize as false
          // // this._loginService.user_name = user.username;
  //       }

  //       } 
        // else {
        //   // Password is incorrect or user not found
        //   this._coreService.openSnackBar('Inccorect password!');
        //   this._dialogRef.close(true);
        //   this._router.navigate(['/home']);
        //   this._loginService.loggedIn= false;
        //   this._loginService.adminIn= false;
         
        // }
 
  //     },
  //     error: (err: any) => {
  //       console.error(err);
        
  //     }
  // });
 
  // }

  

  //method to check if the user name belong to admin or not
  // checkAdmin(username: string): boolean {
  //   //if name has admin in the end then its an admin
  //   if(username.endsWith('admin')){
  //     return true;
  //   }
  //   return false;
  // }


  //if logout is clicked
  onlogout(){
    this._router.navigate(['/home']);
  }

  hide = true;
}
