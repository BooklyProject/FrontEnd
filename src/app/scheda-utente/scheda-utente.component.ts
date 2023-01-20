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
  utente: User | null = null;

  modificaInfo(){
    this.modifica = !this.modifica;
    console.log(this.modifica)
  }

  ngOnInit(): void {
    console.log("sessionid: " + this.sessionId);
    this.server.getUser(this.sessionId).subscribe((u) => {
      console.log("utente: " + u);
      if(u != null) {
        this.utente = u;
      }
    });
  }

  constructor(private server: ServerService) {

  }
}
