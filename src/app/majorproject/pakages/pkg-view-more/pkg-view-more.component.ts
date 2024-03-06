import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddActivityService } from 'src/app/admin/service/add-activity.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';

@Component({
  selector: 'app-pkg-view-more',
  templateUrl: './pkg-view-more.component.html',
  styleUrls: ['./pkg-view-more.component.css']
})
export class PkgViewMoreComponent {

  packageId!: number;
  hotelId!: number;
  activities !: any[];
  spots: string = '';
  package!:any;
  filteredHotels: any[] = [];

  roomSelections: { roomId: number, noRooms: number }[] = [];

  constructor(private _activityService:AddActivityService,
    private _packageService:AddPkgService,
    private _roomService:AddRoomService,
    private _hotelService:AddHotelService,
    private _route: ActivatedRoute,
    private _router:Router,
    private _coreService:CoreService,
    private _dialog: MatDialog){}

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

    bookPackage(){
      this._packageService.getPackageById(this.packageId).subscribe({
        next:(val:any)=>{
          this._router.navigate(['hotelBooking/',this.hotelId],{ state: { roomSelections: this.roomSelections } });
        },error:console.log,
      });
    }

    toggleGuestInput(checked: boolean, roomId: number) {
      if (checked) {
        // Checkbox is checked, call addRoomSelection with default guests (0)
        this.addRoomSelection(roomId, 0, true);
      } else {
        // Checkbox is unchecked, call addRoomSelection with guests as 0 to remove room selection
        this.addRoomSelection(roomId, 0, false);
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
    
}