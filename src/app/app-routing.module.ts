import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SchedaUtenteComponent } from './scheda-utente/scheda-utente.component';
import { SchedaEventiComponent } from './scheda-eventi/scheda-eventi.component';
import { SchedaRaccolteComponent } from './scheda-raccolte/scheda-raccolte.component';

const routes: Routes = [
  {path: '', redirectTo: 'catalogo', pathMatch: 'full'},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'eventi', component: SchedaEventiComponent},
  {path: 'utente', component: SchedaUtenteComponent},
  {path: 'raccolte', component: SchedaRaccolteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
