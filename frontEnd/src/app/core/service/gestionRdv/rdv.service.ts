import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { GestionRdv } from '../../model/gestionRdv/rdv.model';

@Injectable({
  providedIn: 'root'
})
export class RdvService extends EntityCollectionServiceBase<GestionRdv> {
  constructor(
    private http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('GestionRdv', serviceElementsFactory);
  }

  getByQuery(request): Observable<GestionRdv[]> {
    return this.http.get<GestionRdv[]>('api/gestionrdvs', { params: { ...request } })
  }
}
