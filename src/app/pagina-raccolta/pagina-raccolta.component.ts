import { Component, OnInit } from '@angular/core';
import { Raccolta } from '../model/Raccolta';

@Component({
  selector: 'app-pagina-raccolta',
  templateUrl: './pagina-raccolta.component.html',
  styleUrls: ['./pagina-raccolta.component.css']
})
export class PaginaRaccoltaComponent implements OnInit {

    raccolta: Raccolta | null = null;

    tornaIndietro(){

    }
    aggiungiLibro(){

    }
    eliminaRaccolta(){

    }
    eliminaLibro(){

    }

    ngOnInit(): void {
      const urlParams = new URLSearchParams(window.location.search);
      var racc = urlParams.get("raccolta");
      console.log("raccolta:" + racc);
    }
}
