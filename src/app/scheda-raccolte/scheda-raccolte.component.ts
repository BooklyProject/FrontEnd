import { Component, OnInit } from '@angular/core';
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

  sessionId: string = "";
  booksCollection: CollectionResultModel | null = null;
  book: string = "";
  params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

  getRaccolte(){
    this.server.getRaccolteCreate(this.sessionId).subscribe((r) => {
      this.raccolte = r;
    });
  }

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

  eliminaRaccolta(index: number){
    this.server.eliminaRaccolta(this.raccolte[index].id).subscribe(ok => {
      if(ok) {
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