import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDestService {

  constructor(private _http:HttpClient) { }

  // Method to add a destination by sending a POST request to the tomcat server.
  addDestination(data:any): Observable<any>{
    return this._http.post('http://localhost:8086/destination/saveDest',data)
  }

  getDestinationById(id:number):Observable<any>{
    return this._http.get(`http://localhost:8086/destination/getDestinationById/${id}`);
  }
  // Method to retrieve a list of destinations by sending a GET request to the tomcat server.
  getDestinationList(): Observable<any> {
    return this._http.get('http://localhost:8086/destination/getDestinationList');
  }

  // Method to update a destination by sending a PUT request with the destination's ID and updated data.
  updateDestination(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/destination/updateDestination/${id}`, data);
  }

  // Method to delete a destination by sending a DELETE request with the destination's ID.
  deleteDestination(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/destination/deleteDestinationById/${id}`);
  }

  getPakageByDestiantion(state:string,location:string):Observable<any>{
    return this._http.get(`http://localhost:8086/destination/getPackageListByDestination/${state}/${location}`);
  }

  getHotelByLocation(state:string,location:string):Observable<any>{
    return this._http.get(`http://localhost:8086/destination/getHotelListByDestination/${state}/${location}`);
  }
}
