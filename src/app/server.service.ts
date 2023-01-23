import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Volume } from './GoogleBooks/models/volume.interface';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080';

  checkLogin(sessionid: string): Observable<Boolean>{
    return this.http.get<Boolean>(this.url + "/checkAuth", {params: {jsessionid: sessionid}});
  }

  getUser(sessionid: string): Observable<User> {
    return this.http.get<User>(this.url + "/getUser", {params: {jsessionid: sessionid}});
  }

  sendBook(sessionid: string, v: Volume): Observable<Boolean> {
    var isbn;
    console.log("isbn: " + v.volumeInfo.industryIdentifiers);
    for(let i of v.volumeInfo.industryIdentifiers) {
      if(i.type === "ISBN_13") {
        isbn = i.identifier;
      }
    }
    console.log("descr: " + v.volumeInfo.description);
    return this.http.post<Boolean>(this.url + "/sendBook?jsessionid=" + sessionid, {isbn: isbn, nome: v.volumeInfo.title, 
      autore: v.volumeInfo.authors?.join(", "), generi: v.volumeInfo.categories?.join(", "), 
      numeroPagine: v.volumeInfo.pageCount, lingua: v.volumeInfo.language, descrizione: v.volumeInfo.description});
  }
}
