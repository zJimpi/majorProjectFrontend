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
    return this._http.post('http://localhost:3000/user',data);
  }

  // Method to get user data by sending a GET request to the jason server.
  getuser():Observable<any>{
    return this._http.get(`http://localhost:3000/user/`);
  }
}
