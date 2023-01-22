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
  window: number = 1;
  isLogged:Boolean = false;
  sessionId: string = "";

  constructor(private server: ServerService) {

  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("jsessionid");
    console.log("sessionId login: " + sessionId);
    if (sessionId){
      this.server.checkLogin(sessionId).subscribe(ok => {
      this.isLogged = ok;
      console.log(sessionId);
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

  changeWindow(data: number) {
    console.log("data: "+ data);
    console.log("window1: " + this.window);
    this.window = data;
    console.log("window2: " + this.window);
  }
}
