import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'FrontEnd';
  miniSidebar:boolean = true;
  window: number = 1;

  toggleSidebar() {
    this.miniSidebar = !this.miniSidebar;
  }

  changeWindow(data: number) {
    console.log("data: "+ data);
    console.log("window: " + this.window);
    this.window = data;
  }
}
