import { TestBed } from '@angular/core/testing';

import { AuthErrorInterceptorService } from './auth-error-interceptor.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('Error handling - http interceptor', () => {
  let authErrorInterceptor: AuthErrorInterceptorService;
  const testUrl = '/login-and-register';
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthErrorInterceptorService,
          multi: true,
        },
        {
          provide: Router,
          useValue: { url: testUrl },
        },
      ],
    });

    authErrorInterceptor = TestBed.inject(AuthErrorInterceptorService);
    router = TestBed.inject(Router);
  });

  it('should get error - http interceptor and logOut', () => {
    const httpRequestSpy: jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['']);
    const httpHandlerSpy: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue(
      throwError({
        error: {
          message: 'display simulating error 401',
          code: 401,
        },
      })
    );

    authErrorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      () => fail('error 401'),
      (error: { message: string; code: number }) => {
        expect(error.message).toEqual('display simulating error 401');
        expect(error.code).toEqual(401);
        expect(router.url).toEqual(testUrl);
      }
    );
  });
});
