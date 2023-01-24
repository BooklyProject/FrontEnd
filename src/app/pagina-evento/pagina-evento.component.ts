import { Component } from '@angular/core';
import { Evento } from '../model/Evento';

@Component({
  selector: 'app-pagina-evento',
  templateUrl: './pagina-evento.component.html',
  styleUrls: ['./pagina-evento.component.css']
})
export class PaginaEventoComponent {
  evento: Evento | null= null;
  
  tornaIndietro(){

  }
  eliminaEvento(){
    
  }
}
