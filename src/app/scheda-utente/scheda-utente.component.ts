import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-utente',
  templateUrl: './scheda-utente.component.html',
  styleUrls: ['./scheda-utente.component.css']
})
export class SchedaUtenteComponent implements OnInit {

  sessionId: string = "";
  modifica:boolean = false;
  nome: string = "";
  cognome: string = "";
  email: string = "";
  username: string = "";
  utente: User | null = null;

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search); // da chiedere: perchè non prende @Input()?
    var sessionId = urlParams.get("jsessionid");
    if(sessionId != null) {
      this.sessionId = sessionId;
    }
    console.log("sessionid: " + this.sessionId);
    this.server.getUser(this.sessionId).subscribe((u) => {
      console.log("utente: " + u.nome);
      if(u != null) {
        this.utente = u;
        this.nome = this.utente.nome;
        this.cognome = this.utente.cognome;
        this.email = this.utente.email;
        this.username  =this.utente.username;
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
      console.log(this.utente);
    }
  }

  annullaInfo() {
    if(this.utente != null) {
      this.modificaInfo();
      this.nome = this.utente.nome;
      this.cognome = this.utente.cognome;
      this.email = this.utente.email;
      this.username = this.utente.username;
      console.log(this.utente);
    }
  }

  constructor(private server: ServerService) {

  }
}
