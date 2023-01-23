import { Component } from '@angular/core';
import { Raccolta } from '../model/Raccolta';

@Component({
  selector: 'app-scheda-raccolte',
  templateUrl: './scheda-raccolte.component.html',
  styleUrls: ['./scheda-raccolte.component.css']
})
export class SchedaRaccolteComponent {
  
  creazioneRaccolta: boolean = false;
  raccolte: Raccolta[] = [];

  creaRaccolta(){
    this.creazioneRaccolta = !this.creazioneRaccolta;
  }
  conferma(){
    //OPERAZIONI
    this.creaRaccolta();
  }
  annulla(){
    this.creaRaccolta();
  }
  apriRaccolta(){
    
  }
}
