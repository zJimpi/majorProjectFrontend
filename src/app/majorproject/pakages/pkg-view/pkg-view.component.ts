import { Component,Input,OnInit,ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { AddActivityService } from 'src/app/admin/service/add-activity.service';
import { AddDestService } from 'src/app/admin/service/add-dest.service';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';

@Component({
  selector: 'app-pkg-view',
  templateUrl: './pkg-view.component.html',
  styleUrls: ['./pkg-view.component.css']
})
export class PkgViewComponent implements OnInit {

  @Input() state: string='';
  @Input() location: string='';
  @Input() showHero: boolean = true;
  @Input() accessedFromOutside: boolean = false;
  searchQuery: string = '';

  constructor(private _router:Router,
    private _packageService: AddPkgService,
    private _activityService: AddActivityService,
    private _destService:AddDestService){

    }

    packages !: any[];
    filteredPackages: any[] = [];

    ngOnInit(): void {
      if (!this.accessedFromOutside) {
      this.getPackageList();
    }
      else{
        this.getPakagesListByLocation(this.state,this.location);

      }
      
    }

    getPackageList(){
      this._packageService.getPackageList().subscribe({
        next:(res:any)=>{
          this.packages = res;
          this.filteredPackages = [...this.packages];       
        },error: console.log,
      });
    }
    getPakagesListByLocation(state:any,location:any){
      this._destService.getPakageByDestiantion(state,location).subscribe({
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