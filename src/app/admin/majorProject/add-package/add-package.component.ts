import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPkgService } from '../../service/add-pkg.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {

  packageForm! : FormGroup;
  formControl! : FormControl;

  selectedFile !: File;
  message !: string;
  

  constructor(private _formBuilder : FormBuilder,
    private _packageService : AddPkgService,
    private _coreService : CoreService,
    private _dialogRef: MatDialogRef<AddPackageComponent>,
    private _httpClient:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    
    {
      this.packageForm = this._formBuilder.group({
        pckgName : ['',Validators.required],
        packageCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
        packageDuration : ['',Validators.required],
        location : ['',Validators.required],
        price : ['',Validators.required],
        maxNoOfBookings : ['',Validators.required],
        spots : ['',Validators.required],
        imageFile:'',
      }); 

    }

    ngOnInit(): void {
      this.packageForm.patchValue(this.data);
    }

    
    packageFormSubmit(){
      if(this.packageForm.valid){
        if(this.data){//update
          this._packageService.updatePackage(this.data.pckgId,this.packageForm.value).subscribe({
            next : (val:any)=>{
              this._coreService.openSnackBar('Package Details updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
        else{//add

          const formData = {
            pckgName : this.packageForm.value.pckgName,
            packageCode : this.packageForm.value.packageCode,
            packageDuration : this.packageForm.value.packageDuration,
            location : this.packageForm.value.location,
            price : this.packageForm.value.price,
            spots : this.packageForm.value.spots,
            maxNoOfBookings : this.packageForm.value.maxNoOfBookings
          }
          this._packageService.addPackage(formData).subscribe({
            next : (val:any)=>{
              this._coreService.openSnackBar('Package Details added successfully');
              this._dialogRef.close(true);
              this.onUpload(val.pckgId);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
      }
    }

    onUpload(pckgId:any){

      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this._httpClient.post(`http://localhost:8086/image/packagefileSystem/${pckgId}`, uploadImageData, { observe: 'response' })
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