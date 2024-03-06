import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/admin/core/core.service';
import { AddActivityService } from 'src/app/admin/service/add-activity.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';

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
  hotels: any[] = [];
  filteredHotels: any[] = [];

  constructor(private _activityService:AddActivityService,
    private _packageService:AddPkgService,
    private _hotelService:AddHotelService,
    private _route: ActivatedRoute,
    private _coreService:CoreService,
    private _dialog: MatDialog){}

    ngOnInit(): void {
      this.viewActivityDetails();
      this.getHotelList();
      
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
              this.filterHotels(this.package.location);
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

    getHotelList(){
      this._hotelService.getHotelList()
        .subscribe(hotels => {
          this.hotels = hotels;
        });
    }

    filterHotels(location: string): void {
      this.filteredHotels = this.hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location)
      );
    }
}