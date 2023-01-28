import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Volume } from './GoogleBooks/models/volume.interface';
import { Evento } from './model/Evento';
import { Raccolta } from './model/Raccolta';
import { Recensione } from './model/Recensione';


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
    for(let i of v.volumeInfo.industryIdentifiers) {
      if(i.type === "ISBN_13") {
        isbn = i.identifier;
      }
    }
    console.log("descr: " + v.volumeInfo.description);
    console.log("lingua: " + v.volumeInfo.language);
    return this.http.post<Boolean>(this.url + "/sendBook?jsessionid=" + sessionid, {
      isbn: isbn, 
      nome: v.volumeInfo.title, 
      autore: v.volumeInfo.authors?.join(", "), 
      generi: v.volumeInfo.categories?.join(", "), 
      numeroPagine: v.volumeInfo.pageCount, 
      lingua: v.volumeInfo.language, 
      descrizione: v.volumeInfo.description,
      copertina: v.volumeInfo.imageLinks?.thumbnail});
  }

  getEventiCreati(sessionid: string): Observable<Evento[]> {

    return this.http.get<Evento[]>(this.url + "/myEvents", {params: {jsessionid: sessionid}});
  }

  getEventiAccettati(sessionid: string): Observable<Evento[]> {

    return this.http.get<Evento[]>(this.url + "/myPartecipations", {params: {jsessionid: sessionid}});
  }

  getEventiDisponibili(sessionid: string): Observable<Evento[]> {
    
    return this.http.get<Evento[]>(this.url + "/events", {params: {jsessionid: sessionid}});
  }

  addEvent(sessionid: string, e: Evento): Observable<Boolean> {

    return this.http.post<Boolean>(this.url + "/addEvent?jsessionid=" + sessionid, {
      nome: e.nome,
      descrizione: e.descrizione,
      data: e.data,
      luogo: e.luogo,
      partecipanti: e.partecipanti,
      orario: e.orario
    });
  }

  partecipaAEvento(sessionid: string, id: number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/partecipate?jsessionid=" + sessionid, {idEvento: id});
  }

  eliminaEvento(sessionid: string, id: number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/deleteEvent?jsessionid=" + sessionid, {idEvento: id});
  }

  eliminaPartecipazione(sessionid: string, id: number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/deletePartecipation?jsessionid=" + sessionid, {idEvento: id});

  }

  getRaccolteCreate(sessionid: string): Observable<Raccolta[]> {
    return this.http.get<Raccolta[]>(this.url + "/myCollections", {params: {jsessionid: sessionid}});
  }

  eliminaRaccolta(id: number): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/deleteCollection", {idRaccolta: id})
  }
  addRaccolta(sessionid: string, nome: string): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/createCollection?jsessionid=" + sessionid, {nome: nome})
  }

  getLibriDiRaccolta(id: number): Observable<Volume[]> {
    return this.http.post<Volume[]>(this.url + "/getCollectionBooks", {idRaccolta: id});
  }

  addReview(sessionid: string, rec: Recensione): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/addReview?jsessionid=" + sessionid, {
      descrizione: rec.descrizione,
      voto: rec.voto,
      numMiPiace: 0,
      numNonMiPiace: 0
    });
  }

  getRecensioni(sessionid: string): Observable<Recensione[]> {

    return this.http.get<Recensione[]>(this.url + "/getReviews", {params: {jsessionid: sessionid}});
  }

  getScrittoreRecensione(idRec: number): Observable<User> {

    return this.http.post<User>(this.url + "/getReviewWriter", {idRecensione: idRec});
  }
  
  eliminaRecensione(id: number): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/deleteReview", {idRecensione: id})
  }

  addLibroRaccolta(idraccolta: number, libro: Volume): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/addBook?idRaccolta=" + idraccolta, {
      isbn: libro.volumeInfo.industryIdentifiers[0].identifier,
      nome: libro.volumeInfo.title, 
      autore: libro.volumeInfo.authors?.join(", "), 
      generi: libro.volumeInfo.categories?.join(", "), 
      numeroPagine: libro.volumeInfo.pageCount, 
      lingua: libro.volumeInfo.language, 
      descrizione: libro.volumeInfo.description,
      copertina: libro.volumeInfo.imageLinks?.thumbnail});    
  }
  eliminaLibroRaccolta(idraccolta: number, isbn: string): Observable<Boolean>{
    return this.http.get<Boolean>(this.url + "/deleteBook", {params: {idRaccolta: idraccolta ,ISBN: isbn}});
  }
}
