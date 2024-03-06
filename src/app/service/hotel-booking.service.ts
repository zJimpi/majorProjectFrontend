import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelBookingService {

  constructor(private _http:HttpClient) { }

  addHotelBooking(data :any):Observable<any>{
    return this._http.post("http://localhost:3000/hotelbooking",data);
  }

  getHotelBookingById(id:number):Observable<any>{
    return this._http.get(`http://localhost:3000/hotelbooking/${id}`)
    
  }

  updateBookingPriceById(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/hotelbooking/${id}`,data)
  }
}
