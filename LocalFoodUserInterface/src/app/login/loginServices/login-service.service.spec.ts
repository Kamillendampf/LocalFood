import { TestBed } from '@angular/core/testing';

import { environment} from "../../../environment/environment";
import { LoginServiceService } from './login-service.service';
import {HttpTestingController} from "@angular/common/http/testing";

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let httpTestingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
