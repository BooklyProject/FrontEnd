import { Component } from '@angular/core';

@Component({
  selector: 'app-scheda-raccolte',
  templateUrl: './scheda-raccolte.component.html',
  styleUrls: ['./scheda-raccolte.component.css']
})
export class SchedaRaccolteComponent {
  creazioneRaccolta: boolean = false;

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
}
