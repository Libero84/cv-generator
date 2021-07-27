import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import registerMock from '../../../test/mock/reigster-mock.json';
import registerResMock from '../../../test/mock/register-res-mock.json';
import { HttpErrorResponse } from '@angular/common/http';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpTestingController: HttpTestingController;
  const url: string = environment + '/security/register/';
  const registerDataMock = registerMock;
  const registerResDataMock = registerResMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegisterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should communicate with Api register, post', () => {
    service.register(registerDataMock).subscribe((res) => {
      expect(registerResDataMock).toEqual(res);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('POST');

    request.flush(registerResDataMock);
  });

  it('should display error when call api register', () => {
    const msg = 'this is network error simulating error';

    service.register(registerDataMock).subscribe(
      (res) => fail('network error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toEqual(404, status);
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush(msg, { status: 404, statusText: 'Broken network' });
  });
});
