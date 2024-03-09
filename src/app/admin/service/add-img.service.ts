import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddImgService {

  constructor(private _http:HttpClient) { }

  // Method to add an image by sending a POST request to the tomcat server.
  addImage(data:any, id : number):Observable<any>{
    return this._http.post(`http://localhost:8086/image/fileSystem/${id}`,data);
  }

  // // Method to update an image by sending a PUT request with the image's ID and updated data.
  // updateImage(id: number, data: any): Observable<any> {
  //   return this._http.put(`http://localhost:8086/image/${id}`, data);
  // }

  // // Method to retrieve an image by its name by sending a GET request to the tomcat server.
  // getImageByname(name:string): Observable<any>{
  //   return this._http.get(`http://localhost:8086/image/fileSystem${name}`);
  // }

  // // Method to delete an image by sending a DELETE request with the image's ID.
  // deleteImage(id: number): Observable<any> {
  //   return this._http.delete(`http://localhost:8086/image/${id}`);
  // }
}
