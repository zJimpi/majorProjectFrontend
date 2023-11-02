import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDestService {

  constructor(private _http:HttpClient) { }

  addDestination(data:any): Observable<any>{
    
    return this._http.post('http://localhost:3000/destination',data)
  }
  
  updateDestination(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/destination/${id}`, data);
  }

  getDestinationList(): Observable<any> {
    return this._http.get('http://localhost:3000/destination');
  }

  deleteDestination(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/destination/${id}`);
  }

  getImageById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/image/getById/${id}`,{ responseType: 'blob' });
  }

}
