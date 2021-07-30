import { Injectable } from '@angular/core';
import { LoginService } from '../login-service/login.service';
import { RegisterService } from '../register-service/register.service';
import { Token } from '../../../models/token';
import { Login } from '../../../models/login';
import { Register } from '../../../models/register';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../../helper/errorMsg';
import jwt_decode from 'jwt-decode';
import { Credentials } from '../../../models/credentials';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserData$: Observable<Credentials | null>;
  isUserDataSubject$: Subject<Credentials | null> = new BehaviorSubject<Credentials | null>(this.setUserData());
  roles$: Observable<string[]>;
  rolesSubject$: Subject<string[]> = new BehaviorSubject<string[]>(this.setPreviousRoles());

  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly router: Router
  ) {
    this.isUserData$ = this.isUserDataSubject$.asObservable();
    this.roles$ = this.rolesSubject$.asObservable();
  }

  login(body: Login): void {
    this.loginService.login(body).subscribe(
      (res: Token) => {
        localStorage.setItem('token', res.token);
        this.setLogin(res.token);
        this.getRoles(res.token);
        this.router.navigateByUrl('/user');
      },
      (error: HttpErrorResponse) => errorMsg(error)
    );
  }

  logout(): void {
    this.setLogin(null);
    this.resetRoles();
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl('/login-and-register');
  }

  register(body: Register): void {
    this.registerService.register(body).subscribe(
      () => console.info('success create account'),
      (error: HttpErrorResponse) => errorMsg(error)
    );
  }

  private getRoles(token: string): void {
    const credentials: Credentials | null = this.getToken(token);
    this.rolesSubject$.next(credentials?.roles);
  }

  private resetRoles(): void {
    this.rolesSubject$.next();
    this.rolesSubject$.complete();
  }

  private setLogin(token: string | null): void {
    const credential: Credentials | null = this.getToken(token);
    this.isUserDataSubject$.next(credential);
  }

  private setUserData(): Credentials | null {
    const token: string | null = localStorage.getItem('token');
    return token ? this.getToken(token) : null;
  }

  private setPreviousRoles(): string[] {
    const token: string | null = localStorage.getItem('token');
    const credentials: Credentials | null = this.getToken(token);
    return credentials ? credentials.roles : [];
  }

  private getToken(token: string | null): Credentials | null {
    return token ? jwt_decode(token) : null;
  }
}
