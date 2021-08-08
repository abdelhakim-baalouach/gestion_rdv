import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { MenuComponent } from './static/menu/menu.component';
import { AuthenticationComponent } from './features/authentication/authentication.component';
import { ClientComponent } from './features/client/client.component';
import { GestionRdvComponent } from './features/gestion-rdv/gestion-rdv.component';
import { NavbarComponent } from './static/navbar/navbar.component';
import { CanalComponent } from './features/canal/canal.component';
import { TypeRdvComponent } from './features/type-rdv/type-rdv.component';
import { SecteurComponent } from './features/secteur/secteur.component';
import { UtilisateurComponent } from './features/utilisateur/utilisateur.component';
import { BlockHeaderComponent } from './static/block-header/block-header.component';
import { AddClientComponent } from './features/client/add-client/add-client.component';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ListClientComponent } from './features/client/list-client/list-client.component';

/**
 *  NgRx
 */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import { reducers, metaReducers } from './reducers';
import { authInterceptorProviders } from './core/service/auth.interceptor';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MenuComponent,
    AuthenticationComponent,
    ClientComponent,
    GestionRdvComponent,
    NavbarComponent,
    CanalComponent,
    TypeRdvComponent,
    SecteurComponent,
    UtilisateurComponent,
    BlockHeaderComponent,
    AddClientComponent,
    ListClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    NzDrawerModule,
    NzTableModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    })
  ],
  providers: [authInterceptorProviders, { provide: NZ_I18N, useValue: fr_FR }, { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
