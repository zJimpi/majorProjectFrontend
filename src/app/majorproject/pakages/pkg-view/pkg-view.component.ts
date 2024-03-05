import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddActivityService } from 'src/app/admin/service/add-activity.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';

@Component({
  selector: 'app-pkg-view',
  templateUrl: './pkg-view.component.html',
  styleUrls: ['./pkg-view.component.css']
})
export class PkgViewComponent {

  searchQuery: string = '';

  constructor(private _router:Router,
    private _packageService: AddPkgService,
    private _activityService: AddActivityService){

    }

    packages !: any[];
    filteredPackages: any[] = [];

    ngOnInit(): void {
      this.getPackageList();
    }

    getPackageList(){
      this._packageService.getPackageList().subscribe({
        next:(res:any)=>{
          this.packages = res;
          this.filteredPackages = [...this.packages];
          
        },error: console.log,
      });
    }

    filterPackages(searchQuery: string): void {
      this.filteredPackages = this.packages.filter(pkg =>
        pkg.pckgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    viewActivitiesByPackageId(packageId:number){
      this._activityService.getActivityByPackageId(packageId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._router.navigate(['activity/getActivityCardsByPackageId/',packageId]);
        },error:console.log,
      });
    }


}