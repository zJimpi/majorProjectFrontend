import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPkgService } from '../../service/add-pkg.service';
import { AddActivityService } from '../../service/add-activity.service';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';
import { AddPackageComponent } from '../add-package/add-package.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-view-package-table',
  templateUrl: './view-package-table.component.html',
  styleUrls: ['./view-package-table.component.css']
})
export class ViewPackageTableComponent implements OnInit {

  displayedColumns: string[] = [
    'pckgId',
    'pckgName',
    'packageCode',
    'location',
    'price',
    'spots',
    'imageFile',
    'activity',
    'maxNoOfBookings',
    'noOfBookings',
    'action'
  ];

  spot !: String[];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog : MatDialog,
    private _packageService : AddPkgService,
    private _activityService : AddActivityService,
    private _coreService : CoreService,
    private _router:Router){}

    ngOnInit(): void {
      this.getPackageList();

    }

    getPackageList(){
      this._packageService.getPackageList().subscribe({
        next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        },
        error: console.log,
      });
    }

    openPackageForm(){
      const dialogRef =this._dialog.open(AddPackageComponent);

      dialogRef.afterClosed().subscribe({
        next:(val)=>{
          this.getPackageList();
        }
      });
    }

    openEditPackageForm(data :any){
      const dialogRef =this._dialog.open(AddPackageComponent, {data,});
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getPackageList();
          }
        },
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    addActivityByPackageId(packageId:number){

      this._packageService.urlPackageId = packageId;
      const dialogRef =this._dialog.open(AddActivityComponent);
      dialogRef.afterClosed().subscribe({ });
    }

    deletePackageDetails(packageId:number){
      this._packageService.deletePackage(packageId).subscribe({
        next:(res:any)=>{
          console.log(packageId);
          this._coreService.openSnackBar('Package Details Deleted','done');
          this.getPackageList();
        },      
        error: (res) => {
          this._coreService.openSnackBar('Package Details Deleted', 'done');
          this.getPackageList();},
      });
    }

    viewActivitiesByPackageId(packageId:number){
      this._activityService.getActivityByPackageId(packageId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._router.navigate(['activity/getActivityListByPackageId/',packageId]);
        },error:console.log,
      });
    }

    adminhomebtn(){
      this._router.navigate(["/adminHome"])
    }
    

}
