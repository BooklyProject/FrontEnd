import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stats } from '../model/Stats';
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

  stats: Stats | null = null; 

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];
      
      if(sessionId != null) {
        this.sessionId = sessionId;
        
        this.server.getUser(this.sessionId).subscribe((u) => {
          if(u != null) {
            this.utente = u;
            this.nome = this.utente.nome;
            this.cognome = this.utente.cognome;
            this.email = this.utente.email;
            this.username = this.utente.username;
            this.image = "data:image/png;base64, " + this.utente.userImage;
            this.utente.isBanned = false;
          }
        });
        this.server.getStats(this.sessionId).subscribe((s) =>{
          if(s != null){
            this.stats = s;
          }
        })
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
      var nuovoUtente: User = {
        id: this.utente.id,
        email: this.utente.email,
        username: this.utente.username,
        password: this.utente.password,
        nome: this.utente.nome,
        cognome: this.utente.cognome,
        isBanned: this.utente.isBanned,
        userImage: this.utente.userImage,
        stats: this.utente.stats
      }
      
      this.server.modificaUtente(nuovoUtente).subscribe((ok) =>{
        if(ok){
          alert("Profilo modificato con successo");
        } else {
          alert("Errore nella modifica del profilo")
        }
      })
      this.modificaInfo();
    }
  }

  annullaInfo() {
    if(this.utente != null) {
      this.modificaInfo();
      this.nome = this.utente.nome;
      this.cognome = this.utente.cognome;
      this.email = this.utente.email;
      this.username = this.utente.username;
    }
  }

  logout(){
    alert("Sei sicuro?");
    window.location.href = "http://localhost:8080/doLogout";
  }

  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
