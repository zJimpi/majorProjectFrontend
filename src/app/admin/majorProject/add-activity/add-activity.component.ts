import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { AddPkgService } from '../../service/add-pkg.service';
import { AddActivityService } from '../../service/add-activity.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  activityForm:FormGroup;
  activityId!:number;
  packageId!:number;

  constructor(private _formBuilder :FormBuilder,
    private _activityService : AddActivityService,
    private _packageService:AddPkgService,
    private _dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService, 
    )

    {
      this.activityForm=this._formBuilder.group({
        activityName:['',Validators.required],
        activityTiming:['',Validators.required],
        activityDescription:['',Validators.required]
      });
    }

    ngOnInit(): void{
      this.activityForm.patchValue(this.data);
    }

    activityFormSubmit()
    {
      if(this.activityForm.valid)
      {
        if(this.data)
        {
          this._activityService.updateActivity(this.data.activityId, this.activityForm.value).subscribe
          ({
            next: (val: any) =>
            {
              this._coreService.openSnackBar('Activity Deatils Updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => 
            {
              console.error(err);
            } 
          });
        }
        else
        {
          this._activityService.addActivity(this.activityForm.value).subscribe
          ({
            next: (val: any) => 
            {
              this._coreService.openSnackBar('Activity added successfully');

              this._activityService.getActivityById(val.activityId).subscribe
              ({
                next:(res:any)=>
                {
                  this.activityId=res.activityId;
                  console.log(this.activityId);
                  console.log("added");

                  this.assignActivityToPackage();
                  console.log("assigned");
                  this._dialogRef.close(true);
                },
                error:(err:any)=>
                {
                  this._coreService.openSnackBar('Activity assigned to Package successfully');
                }
              });
            },
            error: (err: any) => 
            {
              console.error(err);
            }
          });
        }
      }
    }


    assignActivityToPackage(){
      const rowPackageId = this._packageService.urlPackageId;
      this._activityService.assignActivityIdToPackageId(this.activityId,rowPackageId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._coreService.openSnackBar('Activity assigned to Package successfully');
        },error:(err:any)=>{
          this._coreService.openSnackBar('Activity assigned to Package successfully');
        }
      });
    }
}