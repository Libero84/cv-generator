import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserBackcend, UserBanned, UsersBackend } from '../../../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL: string = environment.url + '/user/';

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<UsersBackend>(this.URL + 'all/').pipe(map((res: UsersBackend) => res.user));
  }

  getLoggedUserInfo(): Observable<User> {
    return this.http.get<UserBackcend>(this.URL).pipe(map((res) => res.user));
  }

  toggleUser(userId: number): Observable<UserBanned> {
    return this.http.post<UserBanned>(this.URL + userId, {});
  }
}
