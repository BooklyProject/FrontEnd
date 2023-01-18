import { Component, OnInit } from '@angular/core';
import { User } from './model/User';
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
  user: User | null = null;

  constructor(private server: ServerService) {

  }

  ngOnInit(): void {
    this.server.getUser().subscribe((u) => {
      this.user = u;
      console.log(this.user);
    });
  }

  toggleSidebar() {
    this.miniSidebar = !this.miniSidebar;
  }

  changeWindow(data: number) {
    console.log("data: "+ data);
    console.log("window: " + this.window);
    this.window = data;
  }
}
