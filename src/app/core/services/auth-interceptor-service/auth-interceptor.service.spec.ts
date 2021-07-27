import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

describe('AuthInterceptorService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header', () => {
    httpClient.get(environment.url).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(environment.url);

    expect(req.request.headers.has('Authorization')).toEqual(true);
  });

  it("shouldn't add Authorization header", () => {
    httpClient.get('/testUrl').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/testUrl');

    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });
});
