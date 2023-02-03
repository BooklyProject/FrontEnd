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

      for(let i of this.segnalazioni) {
        this.server.getUtente(i.utente).subscribe(u => {
          i.username = u.username;
        });
        this.server.getDescrizionePost(i.post).subscribe(descr => {
          i.descrizionePost = descr;
        });
      }
    });
  }

  modera(index: number){
    this.server.bannaUtente(this.segnalazioni[index].post).subscribe((ok) =>{
      if(ok){
        alert("Utente correttamente bandito");
        this.server.eliminaSegnalazioneEPost(this.segnalazioni[index].id).subscribe(ok2 => {
          if(ok2) {
            alert("Segnalazione e post correttamente eliminati");
            const idSegnDaEliminare = [];
            for (let i = 0; i < this.segnalazioni.length; i++) {
              if (this.segnalazioni[i].post === this.segnalazioni[index].post) {
                idSegnDaEliminare.push(this.segnalazioni[i].id);
              }
            }

            const uniqueIds = new Set(idSegnDaEliminare);
            this.segnalazioni = this.segnalazioni.filter(item => !uniqueIds.has(item.id));
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
    const urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("jsessionid");
    if(sessionId) {
      this.sessionId = sessionId;
    }
    this.getSegnalazioni();
  }

  logout(){
    alert("Sei sicuro?");
    window.location.href = "http://localhost:8080/doLogout";
  }    

  constructor(private server: ServerService){

  }
}
