import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CouponService } from './coupon.service';
import { UserprofileService } from '../../UserProfile/userprofile.service';
import {environment} from "../../../../environment/environment";

describe('CouponService', () => {
  let service: CouponService;
  let httpMock: HttpTestingController;
  let userprofileService: jasmine.SpyObj<UserprofileService>;

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserprofileService', [], {
      getIdentKey: 'testKey'
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CouponService,
        { provide: UserprofileService, useValue: userSpy }
      ]
    });

    service = TestBed.inject(CouponService);
    httpMock = TestBed.inject(HttpTestingController);
    userprofileService = TestBed.inject(UserprofileService) as jasmine.SpyObj<UserprofileService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add coupons', () => {
    const couponId = 123;
    const mockResponse = JSON.parse(JSON.stringify({ success: true }));

    service.addCoupons(couponId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/addMyCoupon`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: 'testKey', couponId: couponId });
    expect(req.request.headers.get('Authorization')).toBe('testKey');
    req.flush(mockResponse);
  });

  it('should get all coupons', () => {
    const mockResponse = JSON.parse(JSON.stringify({ coupons: [] }));

    service.getAllCoupons().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/getAllCoupons`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('testKey');
    req.flush(mockResponse);
  });

  it('should get my coupons', () => {
    const mockResponse = JSON.parse(JSON.stringify({ coupons: [] }));

    service.getMyCoupons().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/getMyCoupons`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: 'testKey' });
    expect(req.request.headers.get('Authorization')).toBe('testKey');
    req.flush(mockResponse);
  });

  it('should delete my coupon', () => {
    const couponId = 123;
    const mockResponse = JSON.parse(JSON.stringify({ success: true }));

    service.deleteMyCoupon(couponId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://${environment.apiUrl}/deleteMyCoupons`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ identKey: 'testKey', couponId: couponId });
    expect(req.request.headers.get('Authorization')).toBe('testKey');
    req.flush(mockResponse);
  });
});
