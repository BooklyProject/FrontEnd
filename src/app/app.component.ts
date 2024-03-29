import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  amministratore: boolean = false;
  title = 'FrontEnd';
  miniSidebar:boolean = true;
  sessionId: string = "";

  constructor(private server: ServerService) {

  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("jsessionid");
    if (sessionId){
      this.sessionId = sessionId;
      this.server.checkLogin(this.sessionId).subscribe(ok => {
      if(!ok) {
        this.amministratore = true;
      }
      });
    }
  }

  toggleSidebar() {
    this.miniSidebar = !this.miniSidebar;
  }
}
