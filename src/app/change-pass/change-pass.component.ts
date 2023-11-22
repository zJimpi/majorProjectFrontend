import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../admin/core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
hide=true;

resetPassForm: FormGroup;

//injects services and initializes the SignupComponent.
constructor(private _fb:FormBuilder, // Injecting the FormBuilder service to create and manage the FormGroup.
private _loginService: LoginServiceService, // Injecting a custom LoginServiceService.
private _dialogRef: MatDialogRef<ChangePassComponent>, // Injecting the MatDialogRef to handle the dialog.
@Inject(MAT_DIALOG_DATA) public data: any, // Injecting data passed to the dialog, if any.
private _coreService: CoreService,// Injecting a custom CoreService.
private _router:Router

){

  // Creates the FormGroup named 'signupForm' with form controls and associated validators.
this.resetPassForm=this._fb.group({
  oldPass:['',[Validators.required]], 
  newPass:['', [Validators.required,Validators.minLength(8)]],
  newRePass:['', [Validators.required,Validators.minLength(8)]]
});
}

//update using the old password
onreset(){
    
  this._loginService.getuser().subscribe({
    next:(userDetails: any) => {

      let user = userDetails.find((a:any)=>{
        return a.password === this.resetPassForm.value.oldPass
      });

      //if user details are correct
      if (user) {
        //update the user's pasword
        const userId = user.id; 
        // Update the password field in the user object
        user.password = this.resetPassForm.value.newPass;

        this._loginService.updateUser(userId, user).subscribe({
          next: (response: any) => {
            this._coreService.openSnackBar('Password changed successfully!');
            this._dialogRef.close(true);
            this._router.navigate(['/home']);
            this._loginService.loggedIn= false;
            this._loginService.adminIn= false;
          },
          error: (error: any) => {
            
            console.error('Error updating password', error);
          },
        });


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






}
