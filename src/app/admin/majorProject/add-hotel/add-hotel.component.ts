import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddHotelService } from '../../service/add-hotel.service';
import { CoreService } from '../../core/core.service';
import { AddRoomService } from '../../service/add-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  
  hotelForm:FormGroup;
  roomForm:FormGroup;
  assignForm:FormGroup;
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

  roomTypes:string[]=[
    'Standard Room',
    'Suite',
    'Family Room',
    'Accessible Room'
  ];
  hotelId!: Number;
  roomId!:Number;

  constructor(private _fb:FormBuilder,
    private _hotelService:AddHotelService,
    private _roomService:AddRoomService,
    private _coreService:CoreService,
    private _router:Router

    ){
      this.hotelForm = this._fb.group({
        hotelName:['',Validators.required],
        location:['',Validators.required],
        state:['',Validators.required],
        address:['',Validators.required],
        number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        manager:['',Validators.required],
      });
      this.roomForm=this._fb.group({
        roomName:['',Validators.required],
        roomType:['',Validators.required],
        pricePerDay:['',Validators.required],
      });
      this.assignForm=this._fb.group({
        assingHotelId:['',Validators.required],
        assignRoomid:['',Validators.required]
      });
    }

    hotelFormSubmit(){
      this._hotelService.addHotel(this.hotelForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Hotel added successfully');
         
          //print hotel id
          this._hotelService.getHotelById(val.hotelId).subscribe({
            next:(res:any)=>{
           
              this.hotelId=res.hotelId;
            }
          });
          
         
        },
        error: (err: any) => {
          console.error(err);
        },
      });

    }



    roomFormSubmit(){
      this._roomService.addRoom(this.roomForm.value).subscribe({
        next:(val:any)=>{
          this._coreService.openSnackBar('room added successfully');
         
          //show room id
          this._roomService.getRoomById(val.roomId).subscribe({
            next:(res:any)=>{
             
              this.roomId=res.roomId;
            }
          });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }


    roomAssignToHotel(){
      let hotelId = this.assignForm.get('assingHotelId')?.value;
      let roomId = this.assignForm.get('assignRoomid')?.value;

      this._hotelService.assignRoomIdToHotelId(roomId,hotelId).subscribe({
        next:(val:any)=>{
          
        },
        error:(err:any)=>{
          console.log();
        }
      });

      this._coreService.openSnackBar('room assigned to hotel successfully');
    }

    clearAllForm(){
      this.hotelForm.reset();
      this.roomForm.reset();
      this.assignForm.reset();
    }

    redirectToViewHotel(){
      this._router.navigate(['viewHotel']);
    }
}
