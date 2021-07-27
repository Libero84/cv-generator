import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import loginMock from '../../../test/mock/login-mock.json';
import tokenMock from '../../../test/mock/token-mock.json';
import { Token } from '../../../models/token';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let url: string = environment.url + '/security/login/';
  const loginDataMock = loginMock;
  const tokenDataMock = tokenMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should communicate with api login, method POST', () => {
    service.login(loginDataMock).subscribe((res: Token) => {
      expect(tokenDataMock.token).toEqual(res.token);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('POST');

    request.flush(tokenDataMock);
  });

  it('test for network error', () => {
    const msg = 'this is network error simulating error';

    service.login(loginDataMock).subscribe(
      (res: Token) => fail('network error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush(msg, { status: 404, statusText: 'Broken service' });
  });
});
