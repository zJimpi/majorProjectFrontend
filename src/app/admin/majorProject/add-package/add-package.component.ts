import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPkgService } from '../../service/add-pkg.service';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent {

  packageForm! : FormGroup;
  formControl! : FormControl;
  pckgId! : Number;
  

  constructor(private _formBuilder : FormBuilder,
    private _packageService : AddPkgService,
    private _coreService : CoreService,
    private _router:Router) 
    {
      this.packageForm = this._formBuilder.group({
        pckgName : ['',Validators.required],
        packageCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
        location : ['',Validators.required],
        price : ['',Validators.required],
        spots: this._formBuilder.array([], Validators.required)
      }); 

    }

    get spots(): FormArray {
      return this.packageForm.get('spots') as FormArray;
    }
  
    addSpot() {
      this.spots.push(this._formBuilder.control('', Validators.required));
    }
  
    removeSpot(index: number) {
      this.spots.removeAt(index);
    }
  

    packageFormSubmit(){
      this._packageService.addPackage(this.packageForm.value).subscribe({
        next : (val : any) => {
          this._coreService.openSnackBar('Package added successfully');

          this._packageService.getPackageById(val.pckgId).subscribe({
            next:(res:any)=>{
           
              this.pckgId=res.pckgId;
            }
          });
        },
        error:(err:any)=> {
          console.error(err);
          
        },
      });
    }

    clearAllForm(){
      this.packageForm.reset();
    }

    redirectToViewPackage(){
      this._router.navigate(['viewPackage']);
    }

    


}