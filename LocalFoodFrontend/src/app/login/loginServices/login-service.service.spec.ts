import { TestBed } from '@angular/core/testing';

import { environment} from "../../../../environment/environment";
import { LoginServiceService } from './login-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let httpTestingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginServiceService]
    });
    service = TestBed.inject(LoginServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use localhost:8080',  () => {
    const serverAddras =  `${environment.apiUrl}`;
    expect(serverAddras).toEqual("localhost:8080")
  });

  it('should send login request to the correct URL', () => {
    const testData = 'testUserId';
    const expectedUrl = `${environment.apiUrl}/login`;
    service.loginRequest(testData).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ UserIdentificationKey: testData });

    req.flush({});
  });
});
