import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCarDetailsService } from '../../service/add-car-details.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carRentalDetailsForm! : FormGroup;
  formControl! : FormControl;
  selectedFile !: File;
  message !: string;

  constructor(private _formBuilder : FormBuilder,
    private _carDetailsService : AddCarDetailsService,
    private _coreService : CoreService,
    private _httpClient:HttpClient,
    private _dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 

    {
      this.carRentalDetailsForm = this._formBuilder.group({
        location : ['',Validators.required],
        shopName : ['',Validators.required],
        averagePrice : ['',Validators.required]
      }); 

    }

    ngOnInit(): void {
      this.carRentalDetailsForm.patchValue(this.data);
    }

    carRentalDetailsFormSubmit(){
      if(this.carRentalDetailsForm.valid){
        if(this.data){//update
          this._carDetailsService.updateCarRentalDetails(this.data.id,this.carRentalDetailsForm.value).subscribe({
            next : (val:any)=>{
              this._coreService.openSnackBar('Car Rental Location Details updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
        else{//add

          const formData = {
            location : this.carRentalDetailsForm.value.location,
            shopName : this.carRentalDetailsForm.value.shopName,
            averagePrice : this.carRentalDetailsForm.value.averagePrice
          }
          this._carDetailsService.addCarDetails(formData).subscribe({
            next : (val:any)=>{
              this.onUpload(val.id);
              this._coreService.openSnackBar('Car Rental Location Details added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
      }
    }

    onUpload(carId:any) {
    
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    
      this._httpClient.post(`http://localhost:8086/image/carRentLocationfileSystem/${carId}`, uploadImageData, { observe: 'response' })
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
