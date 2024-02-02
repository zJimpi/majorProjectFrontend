import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddHotelService } from '../../service/add-hotel.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit{
  
  hotelForm:FormGroup;

  stateNames: string[]=[
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir', 
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Punjab',
    'Rajasthan',
    
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    
    
    
    'Andaman and Nicobar Islands',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Pondicherry',
    
    'Chandigarh'
  ];


  // hotelId!: Number;
  // roomId!:Number;

  constructor(private _fb:FormBuilder,
    private _hotelService:AddHotelService,
    private _dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService,


    ){
      this.hotelForm = this._fb.group({
        hotelName:['',Validators.required],
        location:['',Validators.required],
        state:['',Validators.required],
        address:['',Validators.required],
        number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        manager:['',Validators.required],
      });
    }
     //when in edit mode the previous data will show
  ngOnInit(): void {
    this.hotelForm.patchValue(this.data);
}
    
    hotelFormSubmit(){
      if (this.hotelForm.valid) {
        if (this.data) {
          //if data exist then update it 
          this._hotelService.updateHotel(this.data.hotelId, this.hotelForm.value).subscribe({
              
            next: (val: any) => {
                this._coreService.openSnackBar('Hotel details updated!');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } else {
          //else add the data
          this._hotelService.addHotel(this.hotelForm.value).subscribe({
            
            next: (val: any) => {
              this._coreService.openSnackBar('Hotel added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }
    }//end for hotelformsubmit
}
