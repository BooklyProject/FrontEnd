import { Component, Input, OnInit } from '@angular/core';
import { Raccolta } from '../model/Raccolta';
import { CollectionResultModel } from '../GoogleBooks/models/collection-result.interface';
import { SearchParams } from '../GoogleBooks/models/search-params.interface';
import { BooksService } from '../GoogleBooks/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-scheda-raccolte',
  templateUrl: './scheda-raccolte.component.html',
  styleUrls: ['./scheda-raccolte.component.css']
})
export class SchedaRaccolteComponent implements OnInit {
  
  creazioneRaccolta: boolean = false;
  raccolte: Raccolta[] = [];

  raccoltaSelezionata: Raccolta | null = null;

  nome: string = "";

  sessionId: string = "";
  booksCollection: CollectionResultModel | null = null;
  book: string = "";
  params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

  getRaccolte(){
    this.server.getRaccolteCreate(this.sessionId).subscribe((r) => {
      this.raccolte = r;
      for(let r of this.raccolte) {
        this.server.getLibriDiRaccolta(r.id).subscribe(l => {
          r.libri = l;
          r.numLibri = r.libri.length;
        });
      }
    });
  }

  creaRaccolta(){
    this.creazioneRaccolta = !this.creazioneRaccolta;
  }

  conferma(){
    if(this.nome){
      const r : Raccolta = {id:0, nome: this.nome, libri: [], numLibri: 0};
      this.server.addRaccolta(this.sessionId, r.nome).subscribe( ok => {
        if(ok){
          this.raccolte.push(r);
          this.creaRaccolta();
          this.selezionaRaccolta(this.raccolte.length - 1);
        } else {
          alert("Errore: raccolta non creata.");
        }
      });
    } else {
      alert("Errore: inserire nome");
    }
  }

  annulla(){
    this.creaRaccolta();
  }


  selezionaRaccolta(index: number){
    this.raccoltaSelezionata = this.raccolte[index];
    console.log(this.raccoltaSelezionata.id, this.raccoltaSelezionata.nome)
    //window.location.href = "http://localhost:4200/apriRaccolta" + "?jsessionid=" + this.sessionId + "&raccolta=" + this.raccolte[index];
  }

  eliminaRaccolta(index: number){
    this.server.eliminaRaccolta(this.raccolte[index].id).subscribe(ok => {
      if(ok) {
        console.log(this.raccolte[index].nome)
        this.raccolte.splice(index, 1);
      }
    })
  }

  cercaLibro() {
    if(this.book === "") {
      alert("Campo di ricerca vuoto!");
    } else {
      this.params.searchTerm = this.book;
      this.GoogleBooksService.getBooks(this.params).subscribe((response) => {
          if (response) {
            this.booksCollection = response;
            this.booksCollection.items = this.booksCollection.items.filter(book => book.volumeInfo.industryIdentifiers &&
                                              book.volumeInfo.authors && book.volumeInfo.categories &&
                                              book.volumeInfo.description);
            this.booksCollection.totalItems = this.booksCollection.items.length;
          }
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      var sessionId = data['jsessionid'];

      if(sessionId != null) {
        this.sessionId = sessionId;
        console.log("sessionId catalogo: " + this.sessionId);
        this.getRaccolte();
      }
    })
}

constructor(private GoogleBooksService: BooksService, private route: ActivatedRoute, private server: ServerService) {

}
}