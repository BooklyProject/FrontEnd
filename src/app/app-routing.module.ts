import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SchedaUtenteComponent } from './scheda-utente/scheda-utente.component';
import { SchedaEventiComponent } from './scheda-eventi/scheda-eventi.component';
import { SchedaRaccolteComponent } from './scheda-raccolte/scheda-raccolte.component';
import { SchedaRecensioniComponent } from './scheda-recensioni/scheda-recensioni.component';
import { PaginaRaccoltaComponent } from './pagina-raccolta/pagina-raccolta.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: CatalogoComponent},
  {path: 'eventi', component: SchedaEventiComponent},
  {path: 'utente', component: SchedaUtenteComponent},
  {path: 'raccolte', component: SchedaRaccolteComponent},
  {path: 'recensioni', component: SchedaRecensioniComponent},
  {path: 'apriRaccolta', component: PaginaRaccoltaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
