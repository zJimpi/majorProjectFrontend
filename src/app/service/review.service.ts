import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _http:HttpClient) { }

  addReview(data:any):Observable<any>{
    return this._http.post("http://localhost:8086/review/saveReview",data);

  }
  getReviewList():Observable<any>{
    return this._http.get("http://localhost:8086/review/getReviewList");
  }

  getHotelReview(location:string,hotelName:string):Observable<any>{
    return this._http.get(`http://localhost:8086/review/getReviewByLocationAndHotelName/${location}/${hotelName}`)
  }

  getPackageReview(location:string,packageName:string):Observable<any>{
    return this._http.get(`http://localhost:8086/review/getReviewByLocationAndPackageName/${location}/${packageName}`)
  }
  getDestionReviewList(location:string):Observable<any>{
    return this._http.get(`http://localhost:8086/review/getReviewByLocation/${location}`)
  }
}
