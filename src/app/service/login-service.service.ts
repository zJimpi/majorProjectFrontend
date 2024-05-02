import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  // Properties to track whether a user is logged in and whether the user is an admin.
  //can be tracked and injected globally
  loggedIn : boolean =false;
  adminIn : boolean = false;

  user_name : string ='' ;
  

  constructor(private _http:HttpClient) { }

  // Method to add a user by sending a POST request to the jason server.
  adduser(data:any):Observable<any>{
    return this._http.post('http://localhost:8086/user/saveUser',data);
  }

  // Method to get user data by sending a GET request to the jason server.
  getuser(username : string, password : string):Observable<any>{
    return this._http.get(`http://localhost:8086/user/getUserBy/${username}/${password}`);
  }

  getuserByUsername(username : string):Observable<any>{
    return this._http.get(`http://localhost:8086/user/getUserBy/${username}`);
  }


  resetPassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    return this._http.put(`http://localhost:8086/user/changePasswordBy/${username}/${oldPassword}/${newPassword}`, null);
  }

  deleteUser(id : number):Observable<any>{
    return this._http.delete('http://localhost:8086/user/deleteUserById/${id}')
  }

  checkAdmin(username: string, password: string): Observable<boolean> {
    return this._http.get<boolean>(`http://localhost:8086/user/checkAdmin/${username}/${password}`);
  }

  getPackageBookingsByUsername(username: string): Observable<any> {
    return this._http.get(`http://localhost:8086/user/getPackageBookingsByUsername/${username}`);
  }

  getHotelBookingsByUsername(username: string): Observable<any> {
    return this._http.get(`http://localhost:8086/user/getHotelBookingsByUsername/${username}`);
  }

  getCarBookingsByUsername(username: string): Observable<any> {
    return this._http.get(`http://localhost:8086/user/getCarBookingsByUsername/${username}`);
  }
}
