import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-utente',
  templateUrl: './scheda-utente.component.html',
  styleUrls: ['./scheda-utente.component.css']
})
export class SchedaUtenteComponent implements OnInit {

  @Input() sessionId: string = "";
  modifica:boolean = false;
  nome: string = "Emanuele";
  cognome: string = "Conforti";
  email: string = "manu.conforti@gmail.com";
  username: string = "ciccio";
  utente: User = {email: "manu.conforti@gmail.com", username: "ciccio", password: "paswd",
                  nome: "Emanuele", cognome: "Conforti", isBanned: false} ;

  ngOnInit(): void {
    console.log("sessionid: " + this.sessionId);
    this.server.getUser(this.sessionId).subscribe((u) => {
      console.log("utente: " + u);
      if(u != null) {
        this.utente = u;
      }
    });
  }

  modificaInfo(){
    this.modifica = !this.modifica;
  }

  confermaInfo() {
    if(this.utente != null) {
      this.utente.nome = this.nome;
      this.utente.cognome = this.cognome;
      this.utente.email = this.email;
      this.utente.username = this.username;
      this.modificaInfo();
    }
  }

  annullaInfo() {
    this.modificaInfo();
    this.nome = this.utente.nome;
    this.cognome = this.utente.cognome;
    this.email = this.utente.email;
    this.username = this.utente.username;
  }

  constructor(private server: ServerService) {

  }
}
