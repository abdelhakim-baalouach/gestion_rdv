import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
registerLocaleData(fr);

/**
 *  NgRx
 */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityCollectionReducerMethodsFactory, EntityDataModule, EntityDataService, PersistenceResultHandler } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import { reducers, metaReducers } from './reducers';
import { authInterceptorProviders } from './core/service/auth.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { AdditionalPersistenceResultHandler } from './store/entity/additional-persistence-result-handler';
import { AdditionalEntityCollectionReducerMethodsFactory } from './store/entity/additional-entity-collection-reducer-methodsfactory';

/**
 *  ngZorro
 */
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzStepsModule } from 'ng-zorro-antd/steps'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzSliderModule } from 'ng-zorro-antd/slider'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzCarouselModule } from 'ng-zorro-antd/carousel'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzTimelineModule } from 'ng-zorro-antd/timeline'
import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzTransferModule } from 'ng-zorro-antd/transfer'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzAlertModule } from 'ng-zorro-antd/alert'

/**
 *  Component
 */
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
import { ListClientComponent } from './features/client/list-client/list-client.component';


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
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EntityDataModule.forRoot(entityConfig),
    NzSpaceModule,
    NzButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzMenuModule,
    NzPaginationModule,
    NzStepsModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzUploadModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzCarouselModule,
    NzTableModule,
    NzTabsModule,
    NzDrawerModule,
    NzMessageModule,
    NzNotificationModule,
    NzProgressModule,
    NzDividerModule,
    NzRadioModule,
    NzToolTipModule,
    NzTimelineModule,
    NzCalendarModule,
    NzModalModule,
    NzTimePickerModule,
    NzTransferModule,
    NzInputNumberModule,
    NzModalModule,
    NzPopconfirmModule,
    NzGridModule,
    NzEmptyModule,
    NzResultModule,
    NzSpinModule,
    NzPopoverModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzTagModule,
    NzSkeletonModule,
    NzAlertModule,

  ],
  providers: [
    authInterceptorProviders,
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: PersistenceResultHandler, useClass: AdditionalPersistenceResultHandler },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(entityDataService: EntityDataService) { }
}
