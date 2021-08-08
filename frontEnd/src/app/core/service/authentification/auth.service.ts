import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentification } from '../../model/_helper/_helper.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly HOST_AUTH: string = '/api/login'
  readonly helper = new JwtHelperService();
  readonly message = {
    "401": "username ou password incorrect. Veuillez réessaye",
    "403": "403 forbidden",
    "200": "La Connexion Établie Avec Succès",
    "504": "504 Gateway Timeout"
  }
  currentUser: User = {
    username: null,
    roles: []
  }

  constructor(
    private _http: HttpClient
  ) { }

  login(auth: Authentification): Observable<any> {
    const payload = new HttpParams()
      .set('username', auth.username)
      .set('password', auth.password)

    return this._http
      .post<any>(
        this.HOST_AUTH,
        payload.toString(),
        { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'), }
      );
  }

  loggedIn(auth: Authentification) {
    this.login(auth)
      .subscribe(
        (success) => {
          const decodedToken = this.helper.decodeToken(success.access_token);
          this.currentUser.username = decodedToken.sub
          this.currentUser.roles = decodedToken.roles
          console.log(this.currentUser)

          localStorage.setItem("token", success.access_token)
        },
        (failed) => { console.log(failed.status) }
      )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token")
    return !this.helper.isTokenExpired(token);

  }

  isHaveRole(roleName: String): boolean {
    return this.currentUser.roles.find(role => role == roleName)
  }

  logout() {
    localStorage.removeItem('token')
  }
}
