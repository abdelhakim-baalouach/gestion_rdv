import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { setState, updateUserRequest, User } from '../../model/user/user.model';

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

  update(request: updateUserRequest): Observable<any> {
    return this._http.put<any>("/api/user", request);
  }

  updatePassword(request): Observable<any> {
    return this._http.put<any>("/api/user/password", request);
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

    roles.push({ role: 'ROLE_CANAL', text: "Affiche canal" })
    roles.push({ role: 'ROLE_CANAL_ADD', text: "Ajouter canal" })
    roles.push({ role: 'ROLE_CANAL_UPDATE', text: "Modifier canal" })
    roles.push({ role: 'ROLE_CANAL_DELETE', text: "Supprimer canal" })

    roles.push({ role: 'ROLE_TYPE_RDV', text: "Affiche type RDV" })
    roles.push({ role: 'ROLE_TYPE_RDV_ADD', text: "Ajouter type RDV" })
    roles.push({ role: 'ROLE_TYPE_RDV_UPDATE', text: "Modifier type RDV" })
    roles.push({ role: 'ROLE_TYPE_RDV_DELETE', text: "Supprimer type RDV" })

    roles.push({ role: 'ROLE_SECTEUR', text: "Affiche secteur" })
    roles.push({ role: 'ROLE_SECTEUR_ADD', text: "Ajouter secteur" })
    roles.push({ role: 'ROLE_SECTEUR_UPDATE', text: "Modifier secteur" })
    roles.push({ role: 'ROLE_SECTEUR_DELETE', text: "Supprimer secteur" })

    roles.push({ role: 'ROLE_RDV', text: "Affiche les RDVs" })
    roles.push({ role: 'ROLE_RDV_ADD', text: "Ajouter RDV" })
    roles.push({ role: 'ROLE_RDV_UPDATE', text: "Modifier RDV" })
    roles.push({ role: 'ROLE_RDV_DELETE', text: "Supprimer RDV" })

    roles.push({ role: 'ROLE_STATISTIQUE', text: "Afficher les statistique" })

    return roles
  }
}
