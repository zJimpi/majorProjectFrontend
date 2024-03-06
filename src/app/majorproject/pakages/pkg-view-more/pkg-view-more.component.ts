import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  activities !: any[];
  spots: string = '';
  package!:any;
  filteredHotels: any[] = [];

  constructor(private _activityService:AddActivityService,
    private _packageService:AddPkgService,
    private _roomService:AddRoomService,
    private _hotelService:AddHotelService,
    private _route: ActivatedRoute,
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
    
}