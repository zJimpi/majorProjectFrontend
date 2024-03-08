import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCarDetailsService } from '../../service/add-car-details.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carRentalDetailsForm! : FormGroup;
  formControl! : FormControl;

  constructor(private _formBuilder : FormBuilder,
    private _carDetailsService : AddCarDetailsService,
    private _coreService : CoreService,
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
          this._carDetailsService.addCarDetails(this.carRentalDetailsForm.value).subscribe({
            next : (val:any)=>{
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

}
