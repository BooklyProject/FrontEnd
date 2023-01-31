import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Segnalazione } from '../model/Segnalazione';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-segnalazioni',
  templateUrl: './scheda-segnalazioni.component.html',
  styleUrls: ['./scheda-segnalazioni.component.css']
})
export class SchedaSegnalazioniComponent {

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
    this.server.eliminaRecensione(this.segnalazioni[index].id).subscribe((ok) =>{
      if(ok){
        alert("Segnalazione correttamente eliminata");
      } else {
        alert("Errore metodo lasciaPerdere")
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];

      if(sessionId != null) {
        this.sessionId = sessionId;
        console.log("sessionId catalogo: " + this.sessionId);
        this.getSegnalazioni();
      }
    })
  }

  constructor(private server: ServerService, private route: ActivatedRoute){

  }
}
