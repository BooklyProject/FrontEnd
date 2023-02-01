import { Component, Input, OnInit } from '@angular/core';
import { Segnalazione } from '../model/Segnalazione';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-segnalazioni',
  templateUrl: './scheda-segnalazioni.component.html',
  styleUrls: ['./scheda-segnalazioni.component.css']
})
export class SchedaSegnalazioniComponent implements OnInit {

  segnalazioni: Segnalazione[] = [];
  sessionId: string = "";

  getSegnalazioni(){
    this.server.getSegnalazioni(this.sessionId).subscribe((s) =>{
      this.segnalazioni = s;
    })
  }

  modera(index: number){
    this.server.bannaUtente(this.segnalazioni[index].idUtente).subscribe((ok) =>{
      if(ok){
        alert("Utente correttamente bannato");
        this.lasciaPerdere(index);
      } else {
        alert("Errore metodo modera");
      }
    })

  }

  lasciaPerdere(index: number){
    this.server.eliminaSegnalazione(this.segnalazioni[index].id).subscribe((ok) =>{
      if(ok){
        alert("Segnalazione correttamente eliminata");
      } else {
        alert("Errore metodo lasciaPerdere")
      }
    });
  }

  ngOnInit(): void {
    console.log("session: " + this.sessionId);
    const urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("jsessionid");
    if(sessionId) {
      this.sessionId = sessionId;
    }
    console.log("sessionId segnalazioni: " + this.sessionId);
    this.getSegnalazioni();
  }
    

  constructor(private server: ServerService){

  }
}
