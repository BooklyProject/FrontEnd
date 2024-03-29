import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Volume } from './GoogleBooks/models/volume.interface';
import { Evento } from './model/Evento';
import { Raccolta } from './model/Raccolta';
import { Recensione, Commento } from './model/Recensione';
import { Libro } from './model/Libro';
import { Stats } from './model/Stats';
import { Segnalazione } from './model/Segnalazione';


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

  sendLibroRaccolta(sessionid: string, l: Libro): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/getBookFromCollection?jsessionid=" + sessionid, {libro: l});
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

  eliminaRaccolta(id: Number): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/deleteCollection", {idRaccolta: id})
  }
  addRaccolta(sessionid: string, nome: string): Observable<Number>{
    return this.http.post<Number>(this.url + "/createCollection?jsessionid=" + sessionid, {nome: nome})
  }

  getLibriDiRaccolta(id: Number): Observable<Libro[]> {
    return this.http.post<Libro[]>(this.url + "/getCollectionBooks", {idRaccolta: id});
  }

  addReview(sessionid: string, rec: Recensione): Observable<Number> {
    return this.http.post<Number>(this.url + "/addReview?jsessionid=" + sessionid, {
      descrizione: rec.descrizione,
      voto: rec.voto,
      numMiPiace: 0,
      numNonMiPiace: 0
    });
  }

  getRecensioni(sessionid: string): Observable<Recensione[]> {

    return this.http.get<Recensione[]>(this.url + "/getReviews", {params: {jsessionid: sessionid}});
  }

  getScrittoreRecensione(idRec: Number): Observable<User> {
    return this.http.post<User>(this.url + "/getReviewWriter", {idRecensione: idRec});
  }
  
  eliminaRecensione(id: Number): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/deleteReview", {idRecensione: id})
  }

  addLibroRaccolta(idraccolta: Number, libro: Libro): Observable<Boolean>{
    
    return this.http.post<Boolean>(this.url + "/addBook?idRaccolta=" + idraccolta, {
      isbn: libro.isbn,
      nome: libro.nome, 
      autore: libro.autore, 
      generi: libro.generi, 
      numeroPagine: libro.numeroPagine, 
      lingua: libro.lingua, 
      descrizione: libro.descrizione,
      copertina: libro.copertina
    });    
  }

  eliminaLibroRaccolta(idraccolta: Number, isbn: string): Observable<Boolean>{
    var id = idraccolta.valueOf();
    return this.http.get<Boolean>(this.url + "/deleteBook", {params: {idRaccolta: id ,ISBN: isbn}});
  }

  getCommenti(idRec: Number): Observable<Commento[]> {
    return this.http.post<Commento[]>(this.url + "/getComments", {idRecensione: idRec});
  }

  addComment(sessionid: string, idRec: Number, descr: string): Observable<Number> {
    return this.http.post<Number>(this.url + "/addComment?jsessionid=" + sessionid + "&idRec=" + idRec, {descrizione: descr});
  }
  
  deleteComment(idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/deleteComment", {idCommento: idComm});
  }

  getScrittoreCommento(idComm: Number): Observable<User> {
    return this.http.post<User>(this.url + "/getCommentWriter", {idCommento: idComm});
  }

  getStats(sessionid: string): Observable<Stats>{
    return this.http.get<Stats>(this.url + "/getStats", {params: {jsessionid: sessionid}})
  }

  aggiungiLikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/addReviewLike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  rimuoviLikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/removeReviewLike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  aggiungiDislikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/addReviewDislike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  rimuoviDislikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/removeReviewDislike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  aggiungiLikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/addCommentLike?jsessionid=" + sessionid, {idCommento: idComm});
  }

  rimuoviLikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/removeCommentLike?jsessionid=" + sessionid, {idCommento: idComm});
  }

  aggiungiDislikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/addCommentDislike?jsessionid=" + sessionid, {idCommento: idComm});
  }

  rimuoviDislikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/removeCommentDislike?jsessionid=" + sessionid, {idCommento: idComm});
  }
  aggiungiSegnalazione(sessionid: string, Tipo: string, idPost: Number, Descrizione: string): Observable<Boolean>{
    var id = idPost.valueOf();
    return this.http.get<Boolean>(this.url + "/addReport", {params:{sessionId: sessionid, tipo: Tipo, post: id, descrizione: Descrizione}});
  }
  getSegnalazioni(sessionid: string):Observable<Segnalazione[]>{
    return this.http.get<Segnalazione[]>(this.url + "/reports", {params:{jsessionid: sessionid}});
  }
  bannaUtente(id: number): Observable<Boolean>{
    return this.http.get<Boolean>(this.url + "/banUser", {params:{idPost: id}});
  }
  eliminaSegnalazione(idSegnalazione: number): Observable<Boolean>{
    return this.http.get<Boolean>(this.url + "/deleteReport", {params:{id: idSegnalazione}});
  }
  eliminaSegnalazioneEPost(idSegnalazione: number): Observable<Boolean>{
    return this.http.get<Boolean>(this.url + "/deleteReportsAndPost", {params:{id: idSegnalazione}});
  }

  getLikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/getReviewLike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  getDislikeRecensione(sessionid: string, idRec: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/getReviewDislike?jsessionid=" + sessionid, {idRecensione: idRec});
  }

  getLikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/getCommentLike?jsessionid=" + sessionid, {idCommento: idComm});
  }

  getDislikeCommento(sessionid: string, idComm: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + "/getCommentDislike?jsessionid=" + sessionid, {idCommento: idComm});
  }

  getUtente(id: number): Observable<User> {
    return this.http.post<User>(this.url + "/getUserId", {idUtente: id});
  }

  getDescrizionePost(id: number): Observable<any> {
    
    const requestOptions: Object = {
      responseType: 'text'
    }
    
    return this.http.post<any>(this.url + "/getPostDescription", {idPost: id}, requestOptions);
  }
  
  modificaUtente(user: User): Observable<Boolean>{
    return this.http.post<Boolean>(this.url + "/modifyProfile", {utente: user});
  }
}

