import { Component, OnInit } from '@angular/core';
import { Recensione } from '../model/Recensione';

@Component({
  selector: 'app-scheda-recensioni',
  templateUrl: './scheda-recensioni.component.html',
  styleUrls: ['./scheda-recensioni.component.css']
})
export class SchedaRecensioniComponent implements OnInit {
  
  showComments: boolean = false;
  miaRecensione: Recensione | null = null;
  recensioni: Recensione[] = [];

  toggleComments() {
    this.showComments = !this.showComments;  
  } 

  ngOnInit(): void {
      
  }

  constructor() {

  }
}

