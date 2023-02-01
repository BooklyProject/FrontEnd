import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PaginaEventoComponent } from './pagina-evento/pagina-evento.component';
import { SchedaSegnalazioniComponent } from './scheda-segnalazioni/scheda-segnalazioni.component';
import { SchedaRecensioniComponent } from './scheda-recensioni/scheda-recensioni.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    BookCardComponent,
    TruncatePipe,
    SchedaUtenteComponent,
    SchedaEventiComponent,
    SchedaRaccolteComponent,
    PaginaRaccoltaComponent,
    PaginaEventoComponent,
    SchedaSegnalazioniComponent,
    SchedaRecensioniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
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
