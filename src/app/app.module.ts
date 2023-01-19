import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BooksService } from './GoogleBooks/services/books.service';
import { BookCardComponent } from './book-card/book-card.component';
import { TruncatePipe } from './GoogleBooks/truncate-text.pipe';
import { SchedaUtenteComponent } from './scheda-utente/scheda-utente.component';
@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    BookCardComponent,
    TruncatePipe,
    SchedaUtenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    TruncatePipe
  ],
  providers: [
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
