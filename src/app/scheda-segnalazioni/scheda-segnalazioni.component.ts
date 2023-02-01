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
      //console.log("id: " + this.segnalazioni[0].post);

      for(let i of this.segnalazioni) {
        console.log("segnalazione: " + i.descrizione + " " + i.tipo);
        this.server.getUtente(i.utente).subscribe(u => {
          i.username = u.username;
          console.log("username: " + i.username);
        });
        console.log("id: " + i.post);
        this.server.getDescrizionePost(i.post).subscribe(descr => {
          i.descrizionePost = descr;
        });
      }
    });
  }

  modera(index: number){
    this.server.bannaUtente(this.segnalazioni[index].utente).subscribe((ok) =>{
      if(ok){
        alert("Utente correttamente bandito");
        this.server.eliminaSegnalazioneEPost(this.segnalazioni[index].id).subscribe(ok2 => {
          if(ok2) {
            alert("Segnalazione e post correttamente eliminati");
            this.segnalazioni.splice(index, 1);
          }
        });
      }
    });
  }

  lasciaPerdere(index: number){
    this.server.eliminaSegnalazione(this.segnalazioni[index].id).subscribe((ok) =>{
      if(ok){
        alert("Segnalazione correttamente eliminata");
        this.segnalazioni.splice(index, 1);
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
