import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingTableService {

  constructor(private _http:HttpClient) { }

  addBookingTable(data :any):Observable<any>{
    return this._http.post("http://localhost:8086/bookingTable/saveBookingTable",data);
  }
  getBookingById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/bookingTable/getBookingById/${id}`);
  }

  getBookingListByUsername(username: string): Observable<any> {
    return this._http.get(`http://localhost:8086/bookingTable/getBookingListByUsername/${username}`);
  }

  deleteBooking(id : number):Observable<any>{
    return this._http.delete(`http://localhost:8086/bookingTable/deleteBookingById/${id}`)
  }

  updatePriceByBookingId(id : number, price : number):Observable<any>{
    return this._http.put(`http://localhost:8086/bookingTable/updatePriceByBookingId/${id}/${price}`, null)
  }
}
