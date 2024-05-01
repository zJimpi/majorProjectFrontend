import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../admin/core/core.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  signupForm: FormGroup;

  selectedFile !: File;
  message !: string;

  //injects services and initializes the SignupComponent.
  constructor(private _fb:FormBuilder, // Injecting the FormBuilder service to create and manage the FormGroup.
    private _loginService: LoginServiceService, // Injecting a custom LoginServiceService.
    private _dialogRef: MatDialogRef<SignupComponent>,
    private _httpClient:HttpClient, // Injecting the MatDialogRef to handle the dialog.
    @Inject(MAT_DIALOG_DATA) public data: any, // Injecting data passed to the dialog, if any.
    private _coreService: CoreService// Injecting a custom CoreService.

    ){

      // Creates the FormGroup named 'signupForm' with form controls and associated validators.
    this.signupForm=this._fb.group({
      name:['', [Validators.required,Validators.minLength(2),Validators.pattern("^[a-zA-Z ]+$")]], 
      email:['', [Validators.required, Validators.email]],
      mobile:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[0-9]{10}$/)]],
      username:['', [Validators.required,Validators.minLength(2)]],
      password:['', [Validators.required,Validators.minLength(8)]],
      imageFile:''
    });
  }

  // This method is called when the user attempts to sign up
  onSignup(){
    if(this.signupForm.valid){
      // Call the 'adduser' method of the 'LoginServiceService' to add a user with the form values.
      const formData = {
        name : this.signupForm.value.name,
        email : this.signupForm.value.email,
        mobile : this.signupForm.value.mobile,
        username : this.signupForm.value.username,
        password : this.signupForm.value.password
      }

      this._loginService.adduser(formData).subscribe({
        next: (val :any)=>{
          // If the user is successfully added, display a success message using 'openSnackBar'.
          this._coreService.openSnackBar('Resigtered susessfully!');
          // Close the signup dialog with a 'true' value to indicate a successful action.
          this._dialogRef.close(true);
          this.onUpload(val.id);
        },
        error: (err:any)=>{
          // If there is an error, log it to the console.
          console.error(err);
        }
      });
    }
  }

  hide = true;

  onUpload(userId:any){

    const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this._httpClient.post(`http://localhost:8086/image/userfileSystem/${userId}`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this._coreService.openSnackBar('Image added successfully');
          this._dialogRef.close(true);
          
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
    );
  }

  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log('Selected File:', this.selectedFile);
  }
  


}
