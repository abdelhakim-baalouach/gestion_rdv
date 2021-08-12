import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { setState, User } from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityCollectionServiceBase<User> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient
  ) {
    super('User', serviceElementsFactory);
  }

  setStatus(state: setState): Observable<any> {
    return this._http.post<any>("/api/user/setState", state);
  }

  saveUser(request): Observable<any> {
    return this._http.post<any>("/api/userWithRoles", request);
  }

  initRoles(): any[] {
    let roles = []
    roles.push({ role: 'ROLE_USER', text: "Affiche utilisateur" })
    roles.push({ role: 'ROLE_USER_ADD', text: "Ajouter utilisateur" })
    roles.push({ role: 'ROLE_USER_UPDATE', text: "Modifier utilisateur" })
    roles.push({ role: 'ROLE_USER_STATUS', text: "Modifier status d'utilisateur" })

    roles.push({ role: 'ROLE_CLIENT', text: "Affiche client" })
    roles.push({ role: 'ROLE_CLIENT_ADD', text: "Ajouter client" })
    roles.push({ role: 'ROLE_CLIENT_UPDATE', text: "Modifier client" })
    roles.push({ role: 'ROLE_CLIENT_DELETE', text: "Supprimer client" })
    return roles
  }
}
