import { Component, Input, OnInit } from '@angular/core';
import { Raccolta } from '../model/Raccolta';
import { BooksService } from '../GoogleBooks/services/books.service';
import { SearchParams } from '../GoogleBooks/models/search-params.interface';
import { CollectionResultModel } from '../GoogleBooks/models/collection-result.interface';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Volume } from '../GoogleBooks/models/volume.interface';

@Component({
  selector: 'app-pagina-raccolta',
  templateUrl: './pagina-raccolta.component.html',
  styleUrls: ['./pagina-raccolta.component.css']
})
export class PaginaRaccoltaComponent implements OnInit {

    @Input() raccolta: Raccolta | null = null;
    aggiunta: boolean = false;

    @Input() sessionId: string = "";
    booksCollection: CollectionResultModel | null = null;
    book: string = "";
    params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

    addBook(item: Volume){
      console.log(item.volumeInfo);
      if(this.booksCollection != null && this.raccolta?.id != undefined){
        this.server.addLibroRaccolta(this.raccolta?.id, item).subscribe(ok =>{
          if(ok){
            alert(item.volumeInfo.title + " aggiunto alla raccolta");
            this.raccolta?.libri.push(item);
            //SVUOTA CAMPO
          } else {
            alert("Libro non aggiunto alla raccolta")
          }
        });
      }
    }

    conferma(){
      this.apriChiudiForm();
    }
    annulla(){
      this.apriChiudiForm();
    }
    apriChiudiForm(){
      this.aggiunta = !this.aggiunta;
    }
    eliminaLibro(libro: Volume){
      if(this.raccolta?.id != undefined){
        this.server.eliminaLibroRaccolta(this.raccolta?.id, libro.volumeInfo.industryIdentifiers[0].identifier);
      }
      
    }

    searchBook() {
      if(this.book === "") {
        alert("Campo di ricerca vuoto!");
      }
      else {
        this.params.searchTerm = this.book;
        this.GoogleBooksService.getBooks(this.params).subscribe((response) => {
            if (response) {
              this.booksCollection = response;
              this.booksCollection.items = this.booksCollection.items.filter(book => book.volumeInfo.industryIdentifiers &&
                                                book.volumeInfo.authors && book.volumeInfo.categories &&
                                                book.volumeInfo.description);
              this.booksCollection.items = this.booksCollection.items.slice(0, 5);
              this.booksCollection.totalItems = this.booksCollection.items.length;
            }
        });
      }
    }

    ngOnInit(): void {
      
    }
    constructor(private GoogleBooksService: BooksService, private route: ActivatedRoute, private server: ServerService) {
  
    }
}
