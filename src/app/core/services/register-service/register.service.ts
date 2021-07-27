import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../models/register';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private URL = environment.url + '/security/register/';

  constructor(private readonly http: HttpClient) {}

  register(body: Register): Observable<any> {
    return this.http.post<any>(this.URL, body);
  }
}
