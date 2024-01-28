import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHotelService {

  constructor(private _http:HttpClient) { }
 
  addHotel(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/hotel',data)
  }

  getHotelList(): Observable<any> {
    return this._http.get('http://localhost:3000/hotel');
  }

  updateHotel(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/hotel/${id}`, data);
  }

  deleteHotel(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/hotel/${id}`);
  }

}
