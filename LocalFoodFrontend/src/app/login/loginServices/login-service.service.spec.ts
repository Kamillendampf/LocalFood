import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginServiceService } from './login-service.service';
import { environment} from "../../../../environment/environment";

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

  it('should send a login request and return the response', () => {
    const identKey = 'testKey';
    const mockResponse = JSON.parse(JSON.stringify({ success: true }))

    service.loginRequest(identKey).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: identKey });
    req.flush(mockResponse);
  });
});
