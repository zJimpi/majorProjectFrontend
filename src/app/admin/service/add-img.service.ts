import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddImgService {

  constructor(private _http:HttpClient) { }
  addImage(data:any):Observable<any>{
    return this._http.post('http://localhost:8086/image/fileSystem',data);
  }
  updateImage(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/image/${id}`, data);
  }

  getImageByname(name:string): Observable<any>{
    return this._http.get(`http://localhost:8086/image/fileSystem${name}`);
  }

  deleteImage(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/image/${id}`);
  }
}
