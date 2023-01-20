import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080';

  checkLogin(sessionid: string): Observable<Boolean>{
    //let queryParams = new HttpParams();
    //queryParams.append("jsessionid", jsessionid);
    return this.http.get<Boolean>(this.url + "/checkAuth", {params: {jsessionid: sessionid}});
  }

  getUser(sessionid: string): Observable<User> {
    return this.http.post<User>(this.url + "/getUser", {params: {jsessionid: sessionid}});
  }
}
