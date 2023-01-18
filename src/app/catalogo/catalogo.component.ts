import { Component } from '@angular/core';
import { BooksService } from '../GoogleBooks/services/books.service';
import { SearchParams } from '../GoogleBooks/models/search-params.interface';
import { CollectionResultModel } from '../GoogleBooks/models/collection-result.interface';
import { Volume } from '../GoogleBooks/models/volume.interface';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {

  constructor(private GoogleBooksService: BooksService) {

  }

  booksCollection: CollectionResultModel<Volume[]> | null = null;
  book: string = "";
  params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

  searchBook() {
    if(this.book === "") {
      alert("Campo di ricerca vuoto!");
    }

    else {
      this.params.searchTerm = this.book;
      this.GoogleBooksService.getBooks(this.params).subscribe((response) => {
          if (response) {
            this.booksCollection = response;
          }
      });
    }
  }

}
