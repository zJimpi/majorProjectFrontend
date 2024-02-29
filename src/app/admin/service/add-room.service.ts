import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRoomService {

  constructor(private _http:HttpClient) { }
  addRoom(data:any): Observable<any>{
    return this._http.post('http://localhost:8086/room/saveRoom',data)
  }

  getRoomById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/room/getRoomById/${id}`);
  }

  getRoomList():Observable<any>{
    return this._http.get('http://localhost:8086/room/getRoomList');
  }

  getRoomByHotelId(id :number) :Observable<any>{
    return this._http.get(`http://localhost:8086/room/getRoomByHotelId/${id}`);
  }

  updateRoom(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/room/updateRoomById/${id}`, data);
  }

  deleteRoom(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/room/deleteRoomById/${id}`);
  }

}
