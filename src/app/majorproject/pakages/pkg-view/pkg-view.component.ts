import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddPkgService } from 'src/app/admin/service/add-pkg.service';

@Component({
  selector: 'app-pkg-view',
  templateUrl: './pkg-view.component.html',
  styleUrls: ['./pkg-view.component.css']
})
export class PkgViewComponent {

  constructor(private _router:Router,
    private _packageService: AddPkgService){

    }

    packages !: any[];

    ngOnInit(): void {
      this.getPackageList();
    }

    getPackageList(){
      this._packageService.getPackageList().subscribe({
        next:(res:any)=>{
          this.packages = res;
          
        },error: console.log,
      });
    }


}
