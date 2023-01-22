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

  sessionId: string = "";
  eventiCreati: Evento[] = [];
  eventiAccettati: Evento[] = [];
  eventiDisponibili: Evento[] = [];

  getEventi() {

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
  
  constructor(private server: ServerService, private route: ActivatedRoute) {

  }
}
