import { Component } from '@angular/core';
import { Volume } from "../GoogleBooks/models/volume.interface";

@Component({
  selector: 'app-pagina-raccolta',
  templateUrl: './pagina-raccolta.component.html',
  styleUrls: ['./pagina-raccolta.component.css']
})
export class PaginaRaccoltaComponent {

    raccolta:Volume[] = [];

    tornaIndietro(){

    }
    aggiungiLibro(){

    }
    eliminaRaccolta(){

    }
    eliminaLibro(){

    }
}
