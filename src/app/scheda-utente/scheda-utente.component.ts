import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  image: string = "";
  utente: User | null = null;

  modificaFoto(){
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];
      
      if(sessionId != null) {
        this.sessionId = sessionId;
        
        this.server.getUser(this.sessionId).subscribe((u) => {
          console.log("utente: " + u.nome);
          if(u != null) {
            this.utente = u;
            this.nome = this.utente.nome;
            this.cognome = this.utente.cognome;
            this.email = this.utente.email;
            this.username = this.utente.username;
            this.image = "data:image/png;base64, " + this.utente.userImage;
          }
        });
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

  logout(){
    alert("Sei sicuro?");
    window.location.href = "http://localhost:8080/doLogout";

  }

  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
