import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHotelService {

  urlHotelId!:number;


  constructor(private _http:HttpClient) { }
 
  addHotel(data:any): Observable<any>{
    return this._http.post('http://localhost:8086/hotel/saveHotel',data)
  }

  getHotelList(): Observable<any> {
    return this._http.get('http://localhost:8086/hotel/getHotelList');
  }
  getHotelById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/hotel/getHotelById/${id}`);
  }

  updateHotel(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/hotel/updateHotel/${id}`, data);
  }

  deleteHotel(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/hotel/deleteHotelById/${id}`);
  }

  assignRoomIdToHotelId(roomId:number, hotelId:number):Observable<any>{
    return this._http.post(`http://localhost:8086/hotel/assignRoomId/${roomId}/toHotelId/${hotelId}`,null);
    
  }

  updateHotelReview(hotelName:string):Observable<any>{
    
    return this._http.put(`http://localhost:8086/hotel/updateHotelRating/${hotelName}`,null);
    
  }
}
