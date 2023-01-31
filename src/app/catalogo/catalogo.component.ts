import { Component, OnInit } from '@angular/core';
import { BooksService } from '../GoogleBooks/services/books.service';
import { SearchParams } from '../GoogleBooks/models/search-params.interface';
import { CollectionResultModel } from '../GoogleBooks/models/collection-result.interface';
import { ActivatedRoute } from '@angular/router';
import { Volume } from '../GoogleBooks/models/volume.interface';
import { ServerService } from '../server.service';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  cercatoLibri: boolean = false;
  sessionId: string = "";
  booksCollection: CollectionResultModel | null = null;
  book: string = "";
  params: SearchParams = {searchTerm: "", category: "", orderBy: "relevance", startIndex: 0};

  searchBook() {
    if(this.book === "") {
      alert("Campo di ricerca vuoto!");
    }

    else {
      this.cercatoLibri = true;
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
        }
      })
  }

  openBookDetailPage(volume: Volume): void {
    if(volume != null) {
      this.server.sendBook(this.sessionId, volume).subscribe(ok => {
          console.log("res: " + ok);
          window.location.href = "http://localhost:8080/getBook?jsessionid=" + this.sessionId;
      });
    }
  }

  constructor(private GoogleBooksService: BooksService, private route: ActivatedRoute, private server: ServerService) {

  }

}
