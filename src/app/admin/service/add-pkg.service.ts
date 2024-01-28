import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPkgService {

  constructor(private _http:HttpClient) { }

  // Method to add a destination by sending a POST request to the tomcat server.
  addPackage(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/package/savePackage',data)
  }

  // Method to retrieve a list of destinations by sending a GET request to the tomcat server.
  getPackageList(): Observable<any> {
    return this._http.get('http://localhost:3000/package/getPackageList');
  }

  // Method to update a destination by sending a PUT request with the destination's ID and updated data.
  updatePackage(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/package/updatePackage/${id}`, data);
  }

  // Method to delete a destination by sending a DELETE request with the destination's ID.
  deletePackage(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/package/deletePackageById/${id}`);
  }

}
