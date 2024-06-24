import { TestBed } from '@angular/core/testing';
import { ControllerService } from './controller.service';

describe('ControllerService', () => {
  let service: ControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerService]
    });
    service = TestBed.inject(ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set isBooking correctly', () => {
    expect(service.isBooking).toBe(false);  // Default value should be false

    service.isBooking = true;
    expect(service.isBooking).toBe(true);

    service.isBooking = false;
    expect(service.isBooking).toBe(false);
  });

  it('should get and set isNavOn correctly', () => {
    expect(service.isNavOn).toBe(true);  // Default value should be true

    service.isNavOn = false;
    expect(service.isNavOn).toBe(false);

    service.isNavOn = true;
    expect(service.isNavOn).toBe(true);
  });
});
