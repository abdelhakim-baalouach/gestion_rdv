import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentification } from '../../model/_helper/_helper.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

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

  constructor(
    private _http: HttpClient,
    private router: Router,
    private messageService: NzMessageService
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
          localStorage.setItem("token", success.access_token)
          this.messageService.success(this.message["200"])
          this.router.navigate(['dashboard'])
        },
        (failed) => {
          this.messageService.warning(this.message[failed.status])
        }
      )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token")
    return !this.helper.isTokenExpired(token)
  }

  isHaveRole(roleName: String): boolean {
    if (this.getRoles().find(role => role == roleName)) {
      return true
    } else {
      return false
    }
  }

  getUsername() {
    const token = localStorage.getItem("token")
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken.sub
  }

  getRoles(): [] {
    const token = localStorage.getItem("token")
    const decodedToken = this.helper.decodeToken(token)
    return decodedToken.roles
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
}
