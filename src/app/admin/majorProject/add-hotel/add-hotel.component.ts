import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddHotelService } from '../../service/add-hotel.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit{
  
  hotelForm:FormGroup;
  selectedFile !: File;
  message !: string;
//state is removed
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
    private _httpClient:HttpClient
 


    ){
      this.hotelForm = this._fb.group({
        hotelName:['',Validators.required],
        startingPrice:[,Validators.required],
        location:[,Validators.required],
        address:['',Validators.required],
        number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        
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
          const formData = {
            hotelName:this.hotelForm.value.hotelName,
            startingPrice:this.hotelForm.value.startingPrice,
            location:this.hotelForm.value.location,
            address:this.hotelForm.value.address,
            number:this.hotelForm.value.number
          }
          this._hotelService.addHotel(formData).subscribe({
            
            next: (val: any) => {
              this._coreService.openSnackBar('Hotel added successfully');
              this._dialogRef.close(true);
              this.onUpload(val.hotelId);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }
    }//end for hotelformsubmit

    onUpload(hotelId:any) {
    
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    
      this._httpClient.post(`http://localhost:8086/image/hotelfileSystem/${hotelId}`, uploadImageData, { observe: 'response' })
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
