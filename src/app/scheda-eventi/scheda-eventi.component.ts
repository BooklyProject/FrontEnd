import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  getEventi() {

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
  }

  conferma(){
    //PRENDE I DATI
    this.creazioneEvento = !this.creazioneEvento
  }
  
  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
