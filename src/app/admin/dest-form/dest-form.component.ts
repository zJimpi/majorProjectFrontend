import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDestService } from '../service/add-dest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dest-form',
  templateUrl: './dest-form.component.html',
  styleUrls: ['./dest-form.component.css']
})
export class DestFormComponent implements OnInit {

  selectedFile !: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message !: string;
  imageName: any;
  destForm:FormGroup;
  
  stateNames: string[]=[
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir', 
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Punjab',
    'Rajasthan',
    
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    
    
    
    'Andaman and Nicobar Islands',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Pondicherry',
    
    'Chandigarh'
  ];


  constructor(private _fb:FormBuilder,
    private _destService: AddDestService,
    private _dialogRef: MatDialogRef<DestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _httpClient:HttpClient

    ){

    this.destForm=this._fb.group({
      destName:['',Validators.required], 
      destType:['',Validators.required],
      imageLocation:['',Validators.required],
      stateAndUTName:['',Validators.required],
      imageFile:'',
      popularityScore:[0,Validators.required],
      imageDescription:['',Validators.required]
    });
  }

  //when in edit mode the previous data will show
  ngOnInit(): void {
      this.destForm.patchValue(this.data);
  }


  //on submitting the form
  onFormSubmit(){
    if (this.destForm.valid) {
      if (this.data) {
        //if data exist then update it 
        this._destService
          .updateDestination(this.data.destId, this.destForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Destinaltion detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        //else add the data
        const formData = {
          destName : this.destForm.value.destName,
          destType:this.destForm.value.destType,
      imageLocation:this.destForm.value.imageLocation,
      stateAndUTName:this.destForm.value.stateAndUTName,
      popularityScore:this.destForm.value.popularityScore,
      imageDescription:this.destForm.value.imageDescription,

        }
        this._destService.addDestination(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Destinaltion added successfully');
            this._dialogRef.close(true);
            this.onUpload(val.destId);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
     }

     //Gets called when the user clicks on submit to upload the image
  onUpload(destId:any) {
    
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    this._httpClient.post(`http://localhost:8086/image/fileSystem/${destId}`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this._coreService.openSnackBar('Image added successfully');
          this._dialogRef.close(true);
          
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

    //Gets called when the user selects an image
    public onFileChanged(event:any) {
      //Select File
      this.selectedFile = event.target.files[0];
      console.log('Selected File:', this.selectedFile);
    }
}
