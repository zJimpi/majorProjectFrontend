import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRoomService } from '../../service/add-room.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddHotelService } from '../../service/add-hotel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  selectedFile !: File;
  message !: string;
  roomForm:FormGroup;
  roomId!:number;
  hotelId!:number;
  roomTypes:string[]=[
    'Standard Room',
    'Suite',
    'Family Room',
    'Accessible Room'
  ];
  constructor(private _fb:FormBuilder,
    private _roomService:AddRoomService,
    private _hotelSerice:AddHotelService,
    private _dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService,
    private _httpClient:HttpClient
   

    ){
      this.roomForm=this._fb.group({
        roomName:['',Validators.required],
        roomType:['',Validators.required],
        pricePerDay:['',Validators.required],
      });
    }

    ngOnInit(): void { 
      this.roomForm.patchValue(this.data);
    }
    
    roomFormSubmit(){
      if (this.roomForm.valid) {
        if (this.data) {
          //if data exist then update it 
          this._roomService.updateRoom(this.data.roomId, this.roomForm.value).subscribe({
              
            next: (val: any) => {
                this._coreService.openSnackBar('Room details updated!');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } //end of inner if
        else{
          //else add the data
          const formData = {

            roomName:this.roomForm.value.roomName,
            roomType:this.roomForm.value.roomType,
            pricePerDay:this.roomForm.value.pricePerDay

          }
          this._roomService.addRoom(formData).subscribe({
            
            next: (val: any) => {
              this._coreService.openSnackBar('Room added successfully');
              this.onUpload(val.roomId);
              

              //fetching room id
              this._roomService.getRoomById(val.roomId).subscribe({
                next:(res:any)=>{
                  this.roomId=res.roomId;
                  console.log(this.roomId);

               //assign room to hotel
              this.assignRoomToHotel();
              this._dialogRef.close(true);
                },error:(err:any)=>{
                  this._coreService.openSnackBar('Room assigned to hotel successfully');
                }
                
              });

            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }//end of else of inner if
      }//end of 1st if
    }//end of roomformsubmit

    assignRoomToHotel(){
      const rowHotelId= this._hotelSerice.urlHotelId;
      this._hotelSerice.assignRoomIdToHotelId(this.roomId,rowHotelId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._coreService.openSnackBar('Room assigned to hotel successfully');
        },error:(err:any)=>{
          this._coreService.openSnackBar('Room assigned to hotel successfully');
        }
      });
    }

    onUpload(roomId:any) {
    
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    
      this._httpClient.post(`http://localhost:8086/image/roomfileSystem/${roomId}`, uploadImageData, { observe: 'response' })
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
