import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReversGeodecoderService } from './revers-geodecoder.service';

describe('ReversGeodecoderService', () => {
  let service: ReversGeodecoderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReversGeodecoderService]
    });

    service = TestBed.inject(ReversGeodecoderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch address based on latitude and longitude', () => {
    const latitude = 48.8584;
    const longitude = 2.2945;
    const mockResponse = {
      address: {
        road: 'Test Road',
        house_number: '123',
        postcode: '12345',
        city: 'Test City'
      }
    };

    service.getAddress(latitude, longitude).subscribe(address => {
      expect(address.address.road).toBe('Test Road');
      expect(address.address.house_number).toBe('123');
      expect(address.address.postcode).toBe('12345');
      expect(address.address.city).toBe('Test City');
    });

    const req = httpMock.expectOne(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
