import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:8080';

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + "/checkUser");
  }
}
