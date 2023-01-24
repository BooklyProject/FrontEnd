import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Evento } from '../model/Evento';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-eventi',
  templateUrl: './scheda-eventi.component.html',
  styleUrls: ['./scheda-eventi.component.css']
})
export class SchedaEventiComponent implements OnInit {

  creazioneEvento: boolean = false;
  sessionId: string = "";
  eventiCreati: Evento[] = [];
  eventiAccettati: Evento[] = [];
  eventiDisponibili: Evento[] = [];
  nome: string = "";
  descrizione: string = "";
  luogo: string = "";
  giorno: string = "";
  ora: string = "";

  getEventi() {
    this.server.getEventiCreati(this.sessionId).subscribe((e) => {
      this.eventiCreati = e;

      for(let e of this.eventiCreati) {
        const d: Date = e.data;
        console.log("dataaa: " + d);
      }
    });

    this.server.getEventiAccettati(this.sessionId).subscribe((e) => {
        this.eventiAccettati = e;
    });

    this.server.getEventiDisponibili(this.sessionId).subscribe((e) => {
      this.eventiDisponibili = e;
    });
  }

  apriEvento(){
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];
      
      if(sessionId != null) {
        this.sessionId = sessionId;
        this.getEventi();
        console.log("sessionId eventi: " + this.sessionId);
      }
    });
  }

  creaEvento(){
    this.creazioneEvento = !this.creazioneEvento;
    this.nome = "";
    this.descrizione = "";
    this.luogo = "";
    this.giorno = "";
    this.ora = "";
  }

  getData(): Date {

    const [year, month, day] = this.giorno.split('-');

    const date = new Date(+year, +month - 1, +day);

    console.log(date);

    return date;
  }

  conferma(){
    console.log("nome: " + this.nome);
    if(this.nome && this.descrizione && this.giorno && this.ora && this.luogo) {
      const data: Date = this.getData();

      if(data.getTime() > Date.now()) {
        const e: Evento = {nome: this.nome, descrizione: this.descrizione, ora: this.ora, data: data, luogo: this.luogo, partecipanti: 0};
        this.server.addEvent(this.sessionId, e).subscribe( ok => {
          if(ok) {
            this.eventiCreati.push(e);
          }
          else {
            alert("Errore: evento non creato.");
          }
        });
      }

      else {
        alert("Data non valida!");
      }
    }
    this.creaEvento();
  }
  
  eliminaEvento() {

  }

  eliminaPart() {

  }

  partecipa() {

  }
  
  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
