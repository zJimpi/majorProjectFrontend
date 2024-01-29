import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddHotelService } from '../../service/add-hotel.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  
  hotelForm:FormGroup;
  roomForm:FormGroup;
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
  constructor(private _fb:FormBuilder,
    private _hotelService:AddHotelService,
    private _coreService:CoreService,

    ){
      this.hotelForm = this._fb.group({
        hotelName:['',Validators.required],
        hotelLocation:['',Validators.required],
        state:['',Validators.required],
        address:['',Validators.required],
        hotelMobileNumber:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        managerName:['',Validators.required],
      });
      this.roomForm=this._fb.group({
        roomType:['',Validators.required],
        roomName:['',Validators.required],
        pricePerDay:['',Validators.required],
      });
    }

    hotelFormSubmit(){
      this._hotelService.addHotel(this.hotelForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Hotel added successfully');

          //print hotel id
         
        },
        error: (err: any) => {
          console.error(err);
        },
      });

    }

    roomFormSubmit(){}
}
