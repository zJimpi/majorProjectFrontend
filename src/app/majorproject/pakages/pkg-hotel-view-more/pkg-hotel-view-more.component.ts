import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-pkg-hotel-view-more',
  templateUrl: './pkg-hotel-view-more.component.html',
  styleUrls: ['./pkg-hotel-view-more.component.css']
})
export class PkgHotelViewMoreComponent implements OnInit {

  hotelId!: number;
  packageId!: number;
  hotel:any;
  package:any;
  isRoomSelected: boolean = false;
  availableStatus:boolean=false
  displayedColumns: string[] = [
    'roomId',
    'imageFile',
    'roomType',
    'roomName',
    'pricePerDay',
    'selected'
  ];

  roomSelections: { roomId: number, noRooms: number }[] = [];
  reviewForm!:FormGroup
  dateForm!:FormGroup
  dataSource!: MatTableDataSource<any>;
  dialogRef!: MatDialogRef<LoginComponent>;

  constructor(private _roomService:AddRoomService,
    private route: ActivatedRoute,
    private _router:Router,
    public loginService : LoginServiceService,
    private _hotelService:AddHotelService,
    private _packageService:AddPkgService,
    private _fb:FormBuilder,
    private _reviewService:ReviewService,
    private dialog: MatDialog
    ){
      this.reviewForm =this._fb.group({
        comment:''
      });
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.hotelId = +params['hotelId'];
        this.packageId = +params['packageId']; // Extract packageId from params
        this.loadRoomDetails();
        this.getHotelById();
      });
    }
  
    loadRoomDetails() {
      this._roomService.getRoomByHotelId(this.hotelId).subscribe(
        (rooms: any[]) => {
          this.dataSource = new MatTableDataSource<any>([]);
          this.dataSource.data = rooms;
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    }
  
  
    getHotelById() {
      this._hotelService.getHotelById(this.hotelId).subscribe({
        next: (res: any) => {
          this.hotel = res;
          console.log(this.hotel);
        }, error: console.log,
      });
    }



    getPackageById()
    {
      this._packageService.getPackageById(this.packageId).subscribe({
        next: (res: any) => {
          this.package = res;
          console.log(this.package);
        }, error: console.log,
      });
    }
  

  toggleGuestInput(checked: boolean, roomId: number) {
    if (checked) {
      // Checkbox is checked, call addRoomSelection with default guests (0)
      this.addRoomSelection(roomId, 0, true);
      this.isRoomSelected = true;
    } else {
      // Checkbox is unchecked, call addRoomSelection with guests as 0 to remove room selection
      this.addRoomSelection(roomId, 0, false);
      this.isRoomSelected = false;
    }
  }

  addRoomSelection(roomId: number, noRooms: number, isChecked: boolean) {
    if (isChecked) {
      // If checkbox is checked, add or update room selection
      const existingSelectionIndex = this.roomSelections.findIndex(selection => selection.roomId === roomId);
      if (existingSelectionIndex !== -1) {
        // Update existing room selection
        this.roomSelections[existingSelectionIndex].noRooms = noRooms;
      } else {
        // Add new room selection
        this.roomSelections.push({ roomId, noRooms });
      }
    } else {
      // If checkbox is unchecked, remove room selection
      const existingSelectionIndex = this.roomSelections.findIndex(selection => selection.roomId === roomId);
      if (existingSelectionIndex !== -1) {
        // Remove room selection
        this.roomSelections.splice(existingSelectionIndex, 1);
      }
    }
  }

  bookPackage(){
    if(!this.loginService.loggedIn){
      this.openLoginDialog();
    }
    else{
    this._packageService.getPackageById(this.packageId).subscribe({
      next:(val:any)=>{
        this._router.navigate(['packageBooking/',this.packageId],{ state: { roomSelections: this.roomSelections, hotelId: this.hotelId } });
      },error:console.log,
    });
    }
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  addReview(){
    const reviewFormData={
      username:"username(change)",
      location:this.hotel.location,
      hotelName:this.hotel.hotelName,
      comment:this.reviewForm.value.comment,
    }
   this._reviewService.addReview(reviewFormData).subscribe({
    next: (val: any) => {
     console.log("comment added");
     this.reviewForm.reset();
    },
    error: (err: any) => {
      console.error(err);
    },
   });
  }

}
