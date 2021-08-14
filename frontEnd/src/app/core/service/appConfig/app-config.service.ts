import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { AppConfig } from '../../model/appConfig/appConfig.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends EntityCollectionServiceBase<AppConfig> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AppConfig', serviceElementsFactory);
  }
}
