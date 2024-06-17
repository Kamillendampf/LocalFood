// File path: src/app/services/add-coponent.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddCoponentService } from './add-coponent.service';
import { environment } from '../../../../environment/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AddCoponentService', () => {
  let service: AddCoponentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [AddCoponentService]
    });
    service = TestBed.inject(AddCoponentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to add a copon', () => {
    const latitude = 10.0;
    const longitude = 20.0;
    const kategorie = 'TestKategorie';
    const artikelart = 'TestArtikelart';
    const name = 'TestName';
    const beschreibung = 'TestBeschreibung';

    service.addCopon(latitude, longitude, kategorie, artikelart, name, beschreibung).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://' + environment.apiUrl + '/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      latitude: latitude,
      longitude: longitude,
      kategorie: kategorie,
      artikelart: artikelart,
      name: name,
      beschreibung: beschreibung
    });

    req.flush({ success: true });
  });
});
