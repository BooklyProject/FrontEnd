import { Component, Input } from '@angular/core';
import { Evento } from '../model/Evento';

@Component({
  selector: 'app-pagina-evento',
  templateUrl: './pagina-evento.component.html',
  styleUrls: ['./pagina-evento.component.css']
})
export class PaginaEventoComponent {
  @Input() evento: Evento | null= null;
  tornaIndietro: boolean = false;

  tornaAEventi(){
    this.tornaIndietro = !this.tornaIndietro;
  }
  eliminaEvento(){
    
  }
}
