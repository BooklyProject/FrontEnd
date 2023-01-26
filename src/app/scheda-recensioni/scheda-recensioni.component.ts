import { Component } from '@angular/core';

@Component({
  selector: 'app-scheda-recensioni',
  templateUrl: './scheda-recensioni.component.html',
  styleUrls: ['./scheda-recensioni.component.css']
})
export class SchedaRecensioniComponent {
  
  showComments: boolean = false;

  toggleComments() {
    this.showComments = !this.showComments;  
  } 
}

