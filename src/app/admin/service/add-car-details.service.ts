import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCarDetailsService {

  constructor(private _http:HttpClient) { }

  
  addCarDetails(data:any): Observable<any>{
    return this._http.post('http://localhost:8086/carRent/saveCarRentalDetails',data)
  }

  
  getCarRentalDetailsById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/carRent/getCarRentalDetailsById/${id}`);
  }

  
  updateCarRentalDetails(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/carRent/updateCarRentalDetailsById/${id}`, data);
  }

  
  deleteCarRentalDetails(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/carRent/deleteCarRentalDetailsById/${id}`);
  }

  getCarRentalDetailsList():Observable<any>{
    return this._http.get('http://localhost:8086/carRent/getCarRentalDetailsList');
  }
}
