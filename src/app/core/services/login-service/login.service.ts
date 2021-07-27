import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../models/login';
import { Token } from '../../../models/token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL = environment.url + '/security/login/';

  constructor(private readonly http: HttpClient) {}

  login(body: Login): Observable<Token> {
    return this.http.post<Token>(this.URL, body);
  }
}
