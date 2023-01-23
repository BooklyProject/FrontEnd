import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'FrontEnd';
  miniSidebar:boolean = true;
  isLogged:Boolean = false;
  sessionId: string = "";

  constructor(private server: ServerService) {

  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("jsessionid");
    if (sessionId){
      this.server.checkLogin(sessionId).subscribe(ok => {
      this.isLogged = ok;
      if (ok){
        if (sessionId != null){
          this.sessionId = sessionId;
        }
      }
      });
    }
  }

  toggleSidebar() {
    this.miniSidebar = !this.miniSidebar;
  }
}
