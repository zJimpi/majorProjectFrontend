import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddImgService } from '../service/add-img.service';
import { CoreService } from '../core/core.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent {


  constructor(private httpClient: HttpClient) { }

  selectedFile !: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message !: string;
  imageName: any;

  //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log('Selected File:', this.selectedFile);
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8086/image/fileSystem', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';//+response.body;
          this.uploadImgToAngular(this.selectedFile.name);
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

  uploadImgToAngular(imageName: string) {
    // Make a call to Spring Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8086/image/fileSystem' + imageName, { responseType: 'blob' })
      .subscribe((res: Blob) => {
        // Create a Blob URL for the downloaded image
        const blobUrl = window.URL.createObjectURL(res);
  
        // Create an anchor element for downloading
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = imageName; // Set the desired file name
  
        // Trigger a click event to download the image
        anchor.click();
  
        // Clean up the Blob URL and the anchor element
        window.URL.revokeObjectURL(blobUrl);
      });
  }
  
  


  getImage() {
    // Make a call to Spring Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8086/image/fileSystem' + this.imageName, { responseType: 'blob' })
      .subscribe(
        res => {
          const contentType = res.type; // Get the content type from the response

          // Create a URL for the Blob based on the content type
          const imageUrl = window.URL.createObjectURL(res);

          // Set the retrieved image URL to display it
          this.retrievedImage = imageUrl;


          // Determine the image format based on the content type
          let imageFormat = 'jpeg'; // Default to JPEG
          if (contentType === 'image/png') {
            imageFormat = 'png';
          }

          console.log(`Image format: ${imageFormat}`);
          const imageBlob = new Blob([res], { type: contentType });
          this.saveImageLocally(imageBlob, `image.${imageFormat}`);
        }
      );
}

saveImageLocally(blob: Blob, filename: string) {
  // Create a Blob URL for the Blob response
  const imageUrl = window.URL.createObjectURL(blob);

  // You can now use imageUrl to display the image in your Angular application.

  // Optionally, you can save the image as a local file in the browser's memory
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = filename;
  a.click();
}
}
