import { Component, Input, OnInit } from '@angular/core';
import { Raccolta } from '../model/Raccolta';
import { BooksService } from '../GoogleBooks/services/books.service';
import { SearchParams } from '../GoogleBooks/models/search-params.interface';
import { CollectionResultModel } from '../GoogleBooks/models/collection-result.interface';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Volume } from '../GoogleBooks/models/volume.interface';
import { Libro } from '../model/Libro';

@Component({
  selector: 'app-pagina-raccolta',
  templateUrl: './pagina-raccolta.component.html',
  styleUrls: ['./pagina-raccolta.component.css']
})
export class PaginaRaccoltaComponent implements OnInit {

    @Input() raccolta: Raccolta | null = null;
    aggiunta: boolean = false;
    tornaIndietro: boolean = false;

    @Input() sessionId: string = "";
    booksCollection: CollectionResultModel | null = null;
    book: string = "";
    params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

    tornaAlleRaccolte(){
      this.tornaIndietro = !this.tornaIndietro;
    }

    addBook(item: Volume){
      console.log(item.volumeInfo);
      
      if(this.booksCollection != null && this.raccolta?.id != undefined
        && item.volumeInfo.authors && item.volumeInfo.categories && item.volumeInfo.imageLinks?.thumbnail){
        var libro: Libro = {
          isbn: item.volumeInfo.industryIdentifiers[0].identifier,
          nome: item.volumeInfo.title, 
          autore: item.volumeInfo.authors?.join(", "), 
          generi: item.volumeInfo.categories?.join(", "), 
          numeroPagine: item.volumeInfo.pageCount, 
          lingua: item.volumeInfo.language, 
          descrizione: item.volumeInfo.description,
          copertina: item.volumeInfo.imageLinks?.thumbnail
        };

        this.server.addLibroRaccolta(this.raccolta?.id, libro).subscribe(ok =>{
          if(ok){
            alert(item.volumeInfo.title + " aggiunto alla raccolta");
            console.log(item);
            this.raccolta?.libri.push(libro);
            this.book = "";
            this.apriChiudiForm();
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
    eliminaLibro(libro: Libro){
      if(this.raccolta?.id != undefined){
        console.log(libro);
        this.server.eliminaLibroRaccolta(this.raccolta?.id, libro.isbn).subscribe(ok => {
          if(ok) {
            console.log("ok: " + ok);
            if(this.raccolta) {
              console.log("raccolta: " + this.raccolta.id);
              const indexOfObject = this.raccolta.libri.findIndex((object) => {
                return object.isbn === libro.isbn;
              });
              if (indexOfObject !== -1) {
                this.raccolta.libri.splice(indexOfObject, 1);
              }
              console.log("raccolta.libri: " + this.raccolta.libri);
            }
          }
        });
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
