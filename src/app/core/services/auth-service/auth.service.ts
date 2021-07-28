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
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin$!: Observable<boolean>;
  isLoginSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  roles$!: Observable<string[]>;
  rolesSubject$: Subject<string[]> = new ReplaySubject<string[]>(1);

  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly router: Router
  ) {
    this.isLogin$ = this.isLoginSubject$.asObservable();
    this.roles$ = this.rolesSubject$.asObservable();
  }

  login(body: Login): void {
    this.loginService.login(body).subscribe(
      (res: Token) => {
        localStorage.setItem('token', res.token);
        this.setLogin(res);
        this.getRoles(res.token);
        this.router.navigateByUrl('/user');
      },
      (error: HttpErrorResponse) => errorMsg(error)
    );
  }

  logout(): void {
    this.setLogin();
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

  checkLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  private getRoles(token: string): void {
    const credentials: Credentials = jwt_decode(token);
    this.rolesSubject$.next(credentials.roles);
    this.rolesSubject$.complete();
  }

  private resetRoles(): void {
    this.rolesSubject$.next();
    this.rolesSubject$.complete();
  }

  private setLogin(token?: Token): void {
    this.isLoginSubject$.next(!!token);
  }
}
