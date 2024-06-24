import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddCoponentService } from './add-coponent.service';
import { UserprofileService } from '../../UserProfile/userprofile.service';
import { ReversGeodecoderService } from '../../main/reversGeodecoder/revers-geodecoder.service';
import { environment } from '../../../../environment/environment';

describe('AddCoponentService', () => {
  let service: AddCoponentService;
  let httpMock: HttpTestingController;
  let userprofileServiceMock: any;
  let reversGeodecoderServiceMock: any;

  beforeEach(() => {
    userprofileServiceMock = {
      getIdentKey: jasmine.createSpy().and.returnValue('function wrap() {\n' +
        '            return fn(this, arguments, this instanceof wrap);\n' +
        '          }'),
    };

    reversGeodecoderServiceMock = {
      getAddress: jasmine.createSpy().and.returnValue({
        subscribe: jasmine.createSpy().and.callFake((callback: any) => {
         callback;
        })
      })
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AddCoponentService,
        { provide: UserprofileService, useValue: userprofileServiceMock },
        { provide: ReversGeodecoderService, useValue: reversGeodecoderServiceMock }
      ]
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

  it('should call addCopon and make a POST request', () => {
    const latitude = 50.0;
    const longitude = 8.0;
    const kategorie = 'food';
    const artikelart = 'fruit';
    const name = 'apple';
    const beschreibung = 'fresh apple';
    const abholzeit = '10:00';
    const preis = 1.5;

    service.addCopon(latitude, longitude, kategorie, artikelart, name, beschreibung, abholzeit, preis)
      .subscribe(response => {
        expect(response).toBeTruthy();
      });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/addCoupon`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('function wrap() {\n' +
      '            return fn(this, arguments, this instanceof wrap);\n' +
      '          }');
    expect(req.request.body).toEqual({
      identKey: 'function wrap() {\n' +
        '            return fn(this, arguments, this instanceof wrap);\n' +
        '          }',
      username: undefined,
      latitude,
      longitude,
      kategorie,
      artikelart,
      name,
      beschreibung,
      abholzeit,
      preis
    });

    req.flush({});
  });

  it('should call getAddress from ReversGeodecoderService', () => {
    const latitude = 50.0;
    const longitude = 8.0;
    const kategorie = 'food';
    const artikelart = 'fruit';
    const name = 'apple';
    const beschreibung = 'fresh apple';
    const abholzeit = '10:00';
    const preis = 1.5;

    service.addCopon(latitude, longitude, kategorie, artikelart, name, beschreibung, abholzeit, preis)
      .subscribe();

    expect(reversGeodecoderServiceMock.getAddress).toHaveBeenCalledWith(latitude, longitude);

    // Abfangen der HTTP-Anfrage, um den Fehler zu vermeiden
    const req = httpMock.expectOne(`http://${environment.apiUrl}/addCoupon`);
    req.flush({});
  });
});
