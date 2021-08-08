import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentification } from '../../model/_helper/_helper.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private HOST_AUTH: string = '/api/login'
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
}
