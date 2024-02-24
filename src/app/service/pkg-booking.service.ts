import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PkgBookingService {

  constructor(private _http:HttpClient) { }

  addPackageBookingForm(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/packagebooking',data)
  }

  getPackageBookingList(): Observable<any> {
    return this._http.get('http://localhost:3000/packagebooking');
  }

  getPackageBookingById(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/packagebooking/${id}`);
  }

}