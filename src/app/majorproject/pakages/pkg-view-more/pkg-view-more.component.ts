import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddActivityService } from 'src/app/admin/service/add-activity.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-pkg-view-more',
  templateUrl: './pkg-view-more.component.html',
  styleUrls: ['./pkg-view-more-new.component.css']
})
export class PkgViewMoreComponent implements OnInit {

  packageId!: number;
  hotelId!: number;
  activities !: any[];
  spots: string = '';
  package!:any;
  filteredHotels: any[] = [];
  dialogRef!: MatDialogRef<LoginComponent>;

  isHotelSelected: boolean = false;
  isRoomSelected: boolean = false;

  roomSelections: { roomId: number, noRooms: number }[] = [];
  hotelSelections: { hotelId: number, isChecked: boolean } = { hotelId: 0, isChecked: false };

  reviewForm:FormGroup
  constructor(private _activityService:AddActivityService,
    private _packageService:AddPkgService,
    private _roomService:AddRoomService,
    public loginService : LoginServiceService,
    private _fb:FormBuilder,
    private _route: ActivatedRoute,
    private _router:Router,
    private _reviewService:ReviewService,
    private dialog: MatDialog
   
   ){
    this.reviewForm =this._fb.group({
      comment:''
    });
   }

    ngOnInit(): void {
      this.viewActivityDetails();
    }

    viewActivityDetails() 
    {
      this._route.params.subscribe(params => 
      {
        this.packageId = +params['packageId'];
    
        if (this.packageId !== undefined) 
        {
          this._activityService.getActivityByPackageId(this.packageId).subscribe(
            (activities: any[]) => {
              this.activities = activities;
            },
            error => {
              console.error('Error fetching activity details:', error);
            }
          );
          this._packageService.getPackageById(this.packageId).subscribe(
            (res: any) => {
              this.package = res;
              this.getFilteredHotelList();
            },
            error => {
              console.error('Error fetching spot details:', error);
            }
          );
        } 
        else 
        {
          console.error('PackageId is undefined.');
        }
      });
    }

    getFilteredHotelList(){
      this._packageService.getHotelsByPackageLocation(this.package.location)
        .subscribe(hotels => {
          this.filteredHotels = hotels;
          this.filteredHotels.forEach(hotel => {
            this._roomService.getRoomByHotelId(hotel.hotelId).subscribe(rooms => {
              hotel.rooms = rooms;
            });
          });
        });
    }

    viewRoomsByHotelId(hotelId:number)
    {
      this._roomService.getRoomByHotelId(hotelId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._router.navigate(['pakageView/pakageViewMore/viewRoomsByHotelId', hotelId, 'packageId', this.packageId]);
        },error:console.log,
      });
    }
    
    bookPackage(){
      if(!this.loginService.loggedIn){
        this.openLoginDialog();
      }
      else{
      this._packageService.getPackageById(this.packageId).subscribe({
        next:(val:any)=>{
          this._router.navigate(['packageBooking/',this.packageId],{ state: { roomSelections: this.roomSelections, hotelSelections: this.hotelSelections } });
        },error:console.log,
      });
    }
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

    toggleHotelInput(checked: boolean, hotelId: number) {
      if(checked) {
        this.addHotelSelection({ hotelId, isChecked: true });
        this.isHotelSelected = true;
      } else {
        this.addHotelSelection({ hotelId, isChecked: false });
        this.isHotelSelected = false;
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

    addHotelSelection(selection: { hotelId: number; isChecked: boolean; }) {
      if (selection.isChecked) {
        // If checkbox is checked, set hotel selection
        this.hotelSelections = { hotelId: selection.hotelId, isChecked: true };
      } else {
        // If checkbox is unchecked, clear hotel selection
        this.hotelSelections = { hotelId: 0, isChecked: false }; // Reset to default values
      }
    }    

    isBookNowDisabled(): boolean {
      // Check if at least one hotel is selected
      const isHotelSelected = this.filteredHotels.some(hotel => hotel.isChecked);
    
      // Check if at least one room is selected
      const isRoomSelected = this.filteredHotels.some(hotel => hotel.rooms.some((room: { isChecked: any; }) => room.isChecked));
    
      // Disable the button if either no hotel or no room is selected
      return !isHotelSelected || !isRoomSelected;
    }
    
    areHotelAndRoomSelected(): boolean {
      return this.isHotelSelected && this.isRoomSelected;
    }
    
  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }
}