import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/service/authentification/auth-guard.service';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AuthenticationComponent } from './features/authentication/authentication.component';
import { CanalComponent } from './features/canal/canal.component';
import { AddClientComponent } from './features/client/add-client/add-client.component';
import { ClientComponent } from './features/client/client.component';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { UpdateClientComponent } from './features/client/update-client/update-client.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddRdvComponent } from './features/gestion-rdv/add-rdv/add-rdv.component';
import { GestionRdvComponent } from './features/gestion-rdv/gestion-rdv.component';
import { SecteurComponent } from './features/secteur/secteur.component';
import { TypeRdvComponent } from './features/type-rdv/type-rdv.component';
import { AddUtilisateurComponent } from './features/utilisateur/add-utilisateur/add-utilisateur.component';
import { ListUtilisateurComponent } from './features/utilisateur/list-utilisateur/list-utilisateur.component';
import { UpdateUtilisateurComponent } from './features/utilisateur/update-utilisateur/update-utilisateur.component';
import { UtilisateurComponent } from './features/utilisateur/utilisateur.component';
import { AddAppConfigComponent } from './features/_appConfig/add-app-config/add-app-config.component';
import { ListAppConfigComponent } from './features/_appConfig/list-app-config/list-app-config.component';
import { UpdateAppConfigComponent } from './features/_appConfig/update-app-config/update-app-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  {
    path: 'societe',
    component: ClientComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'societe', component: AddClientComponent, canActivate: [AuthGuardService] },
      { path: 'societe', component: ListClientComponent, canActivate: [AuthGuardService] },
      { path: 'societe', component: UpdateClientComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'gestion-rdv',
    component: GestionRdvComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'gestion-rdv', component: AddRdvComponent, canActivate: [AuthGuardService] },
    ]
  },
  {
    path: 'canal',
    component: CanalComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'canal', component: AddAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'canal', component: ListAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'canal', component: UpdateAppConfigComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'type-rdv',
    component: TypeRdvComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'type-rdv', component: AddAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'type-rdv', component: ListAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'type-rdv', component: UpdateAppConfigComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'secteur',
    component: SecteurComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'secteur', component: AddAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'secteur', component: ListAppConfigComponent, canActivate: [AuthGuardService] },
      { path: 'secteur', component: UpdateAppConfigComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'utilisateur',
    component: UtilisateurComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'utilisateur', component: AddUtilisateurComponent, canActivate: [AuthGuardService] },
      { path: 'utilisateur', component: ListUtilisateurComponent, canActivate: [AuthGuardService] },
      { path: 'utilisateur', component: UpdateUtilisateurComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
