import { Component } from '@angular/core';

@Component({
  selector: 'app-scheda-utente',
  templateUrl: './scheda-utente.component.html',
  styleUrls: ['./scheda-utente.component.css']
})
export class SchedaUtenteComponent {

  modifica:boolean = false;

  modificaInfo(){
    this.modifica = !this.modifica;
    console.log(this.modifica)
  }
}
