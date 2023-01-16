import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  mini:boolean = true;
  
  toggleSidebar() {
    if (this.mini) {
        this.mini = false;
    } else {
        this.mini = true;
    }
  }
}
