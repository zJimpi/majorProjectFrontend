import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPkgService } from '../../service/add-pkg.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {

  packageForm! : FormGroup;
  formControl! : FormControl;
  

  constructor(private _formBuilder : FormBuilder,
    private _packageService : AddPkgService,
    private _coreService : CoreService,
    private _dialogRef: MatDialogRef<AddPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    
    {
      this.packageForm = this._formBuilder.group({
        pckgName : ['',Validators.required],
        packageCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
        packageDuration : ['',Validators.required],
        location : ['',Validators.required],
        price : ['',Validators.required],
        spots : ['',Validators.required],
      }); 

    }

    ngOnInit(): void {
      this.packageForm.patchValue(this.data);
    }

    
    packageFormSubmit(){
      if(this.packageForm.valid){
        if(this.data){//update
          this._packageService.updatePackage(this.data.pckgId,this.packageForm.value).subscribe({
            next : (val:any)=>{
              this._coreService.openSnackBar('Package Details updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
        else{//add
          this._packageService.addPackage(this.packageForm.value).subscribe({
            next : (val:any)=>{
              this._coreService.openSnackBar('Package Details added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
        }
      }
    }
}