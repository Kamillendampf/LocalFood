import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import { environment } from '../../../environment/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should handle error response', () => {
    const identKey = 'testKey';
    const name = "Jon Doe";
    const email = "jon.doe@mail.de";
    const profileType = true;

    service.registerUser(identKey, name, email, profileType).subscribe(
      () => fail('should have failed with the 405 error'),
      (error) => {
        expect(error.status).toBe(405);
      }
    );

    const req = httpMock.expectOne(`http://${environment.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 405, statusText: 'Method Not Allowed' });
  });
});
