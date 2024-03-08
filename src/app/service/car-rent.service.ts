import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarRentService {

  constructor(private _http:HttpClient) { }

  addCarBooking(data :any):Observable<any>{
    return this._http.post("http://localhost:8086/carBooking/saveCarBooking",data);
  }
  getCarBookingById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/carBooking/getCarBookingById/${id}`);
  }

  getCarBookingListByUsername(username: string): Observable<any> {
    return this._http.get(`http://localhost:8086/carBooking/getCarBookingListByUsername/${username}`);
  }

  deleteCarBooking(id : number):Observable<any>{
    return this._http.delete(`http://localhost:8086/carBooking/deleteCarBookingById/${id}`)
  }
}
