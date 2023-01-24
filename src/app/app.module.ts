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
import { SchedaEventiComponent } from './scheda-eventi/scheda-eventi.component';
import { SchedaRaccolteComponent } from './scheda-raccolte/scheda-raccolte.component';
import { PaginaRaccoltaComponent } from './pagina-raccolta/pagina-raccolta.component';
@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    BookCardComponent,
    TruncatePipe,
    SchedaUtenteComponent,
    SchedaEventiComponent,
    SchedaRaccolteComponent,
    PaginaRaccoltaComponent
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
