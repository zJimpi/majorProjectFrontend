import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddActivityService } from '../../service/add-activity.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageComponent } from '../add-package/add-package.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit{

  packageId!: number;
  
  displayedColumns: string[] = [
    'activityId', 
    'activityName', 
    'activityTiming', 
    'activityDescription', 
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(private _activityService:AddActivityService,
    private _route: ActivatedRoute,
    private _coreService:CoreService,
    private _dialog: MatDialog){}

    ngOnInit(): void {
      this.viewActivityDetails();
    }

    // viewActivityDetails(){
    //   this._route.params.subscribe(params => 
    //   {
    //     this.packageId = +params['packageId'];
    //     this._activityService.getActivityByPackageId(this.packageId).subscribe(
    //       (activities:any[]) => {
    //         this.dataSource = new MatTableDataSource<any>([]);
    //         this.dataSource.data = activities;
    //       },
    //       error => {
    //         console.error('Error fetching activity details:', error);
    //       }
    //     );
    //   });
    // }

    viewActivityDetails() {
      this._route.params.subscribe(params => {
        this.packageId = +params['packageId'];
    
        // Check if packageId is defined before making the request
        if (this.packageId !== undefined) {
          this._activityService.getActivityByPackageId(this.packageId).subscribe(
            (activities: any[]) => {
              this.dataSource = new MatTableDataSource<any>(activities);
            },
            error => {
              console.error('Error fetching activity details:', error);
            }
          );
        } else {
          console.error('PackageId is undefined.');
          // Handle the case where packageId is undefined, e.g., display an error message to the user.
        }
      });
    }
    


    openEditForm(data : any)
    {
      const dialogRef = this._dialog.open(AddActivityComponent, {data});
  
      dialogRef.afterClosed().subscribe({
        next: (val) => 
        {
          if (val) 
          {
            this.viewActivityDetails();
          }
        },
      });
    }



    deleteActivity(id:number)
    {
      this._activityService.deleteActivity(id).subscribe({
        next:(res:any)=>{
          this._coreService.openSnackBar('activity details deleted','done');
          this.viewActivityDetails();
        },error: (res) => {
          this._coreService.openSnackBar('activity details deleted', 'done');
          this.viewActivityDetails();},
      });
    }
}