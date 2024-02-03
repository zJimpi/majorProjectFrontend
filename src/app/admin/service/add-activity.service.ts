import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddActivityService {


  constructor(private _http:HttpClient) { }

  
  addActivity(data:any): Observable<any>{
    return this._http.post('http://localhost:8086/activity/saveActivity',data)
  }

  
  getActivityById(id: number): Observable<any> {
    return this._http.get(`http://localhost:8086/activity/getActivityById/${id}`);
  }

  
  updateActivity(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8086/activity/updateActivityById/${id}`, data);
  }

  
  deleteActivity(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8086/activity/deleteActivityById/${id}`);
  }

  assignActivityIdToPackageId(activityId :number, packageId:number):Observable<any>{
    return this._http.post(`http://localhost:8086/activity/assignActivityId/${activityId}/toPackageId/${packageId}`,null);
  }

  getActivityList():Observable<any>{
    return this._http.get('http://localhost:8086/activity/getActivityList');
  }

  getActivityByPackageId(id :number) :Observable<any>{
    return this._http.get(`http://localhost:8086/activity/getActivityListByPackageId/${id}`);
  }
}
