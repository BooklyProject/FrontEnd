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
      for(let i of this.eventiCreati) {
        this.setPrintDate(i);
      }
    });

    this.server.getEventiAccettati(this.sessionId).subscribe((e) => {
        this.eventiAccettati = e;
        for(let i of this.eventiCreati) {
          this.setPrintDate(i);
        }
    });

    this.server.getEventiDisponibili(this.sessionId).subscribe((e) => {
      this.eventiDisponibili = e;
      for(let i of this.eventiCreati) {
        this.setPrintDate(i);
      }
    });
  }

  setPrintDate(e: Evento) {
    e.printDate = e.data.toString();
  }

  apriEvento(){
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];
      
      if(sessionId != null) {
        this.sessionId = sessionId;
        this.getEventi();
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

    return date;
  }

  conferma(){
    if(this.nome && this.descrizione && this.giorno && this.ora && this.luogo) {
      const data: Date = this.getData();

      if(data.getTime() > Date.now()) {
        const e: Evento = {id: 0, nome: this.nome, descrizione: this.descrizione, orario: this.ora, data: data, luogo: this.luogo, partecipanti: 0, printDate: ""};
         e.printDate = data.toISOString().substring(0, 10);
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
  
  eliminaEvento(index: number) {
    this.server.eliminaEvento(this.sessionId, this.eventiCreati[index].id).subscribe(ok => {
      if(ok) {
        this.eventiCreati.splice(index, 1);
      }
    })
  }

  eliminaPart(index: number) {
    this.server.eliminaPartecipazione(this.sessionId, this.eventiAccettati[index].id).subscribe(ok => {
      if(ok) {
        this.eventiDisponibili.push(this.eventiAccettati[index]);
        this.eventiAccettati.splice(index, 1);
      }
    })
  }

  partecipa(index: number) {
    this.server.partecipaAEvento(this.sessionId, this.eventiDisponibili[index].id).subscribe(ok => {
      if(ok) {
        this.eventiAccettati.push(this.eventiDisponibili[index]);
        this.eventiDisponibili.splice(index, 1);
      }
      else {
        alert("Attenzione, non è più possibile partecipare all'evento");
      }
    });
    

  }
  
  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
