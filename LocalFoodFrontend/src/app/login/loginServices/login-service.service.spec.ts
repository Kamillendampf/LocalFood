// File path: src/app/login/loginServices/login-service.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginServiceService } from './login-service.service';
import { environment } from '../../../../environment/environment';

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginServiceService]
    });
    service = TestBed.inject(LoginServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to login', () => {
    const identKey = '12345';
    const mockResponse = {
      identKey: '12345',
      email: 'test@example.com',
      name: 'Test User',
      profileType: 'user'
    };

    service.loginRequest(identKey).subscribe(response => {
      expect(response).toEqual(mockResponse as unknown as JSON);
    });

    const req = httpMock.expectOne('http://' + environment.apiUrl + '/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: identKey });

    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const identKey = 'wrongKey';
    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

    service.loginRequest(identKey).subscribe(
      response => fail('expected an error, not a response'),
      error => {
        expect(error.status).toBe(401);
      }
    );

    const req = httpMock.expectOne('http://' + environment.apiUrl + '/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: identKey });

    req.flush(null, mockErrorResponse);
  });
});
