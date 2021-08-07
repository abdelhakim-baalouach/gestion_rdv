import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AuthenticationComponent } from './features/authentication/authentication.component';
import { CanalComponent } from './features/canal/canal.component';
import { ClientComponent } from './features/client/client.component';
import { GestionRdvComponent } from './features/gestion-rdv/gestion-rdv.component';
import { SecteurComponent } from './features/secteur/secteur.component';
import { TypeRdvComponent } from './features/type-rdv/type-rdv.component';
import { UtilisateurComponent } from './features/utilisateur/utilisateur.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'client', component: ClientComponent },
  { path: 'gestion-rdv', component: GestionRdvComponent },
  { path: 'canal', component: CanalComponent },
  { path: 'type-rdv', component: TypeRdvComponent },
  { path: 'secteur', component: SecteurComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: '**', component: PageNotFoundComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
