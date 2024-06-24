import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {MainComponent} from './main.component';
import {ReversGeodecoderService} from './reversGeodecoder/revers-geodecoder.service';
import {CouponService} from './CouponService/coupon.service';
import {DistanceService} from './Distance/distance.service';
import {ControllerService} from './overview/overlayControl/controller.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let reversGeoSpy: jasmine.SpyObj<ReversGeodecoderService>;
  let couponSpy: jasmine.SpyObj<CouponService>;
  let distSpy: jasmine.SpyObj<DistanceService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let controlerSpy: jasmine.SpyObj<ControllerService>;

  beforeEach(waitForAsync(() => {
    const reversGeoServiceSpy = jasmine.createSpyObj('ReversGeodecoderService', ['getAddress']);
    const couponServiceSpy = jasmine.createSpyObj('CouponService', ['getAllCoupons']);
    const distanceServiceSpy = jasmine.createSpyObj('DistanceService', ['getDistance']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterAllClosed']);
    const controllerServiceSpy = jasmine.createSpyObj('ControllerService', [], { isNavOn: true });

    TestBed.configureTestingModule({
      imports: [
        MainComponent,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule
      ],
      providers: [
        { provide: ReversGeodecoderService, useValue: reversGeoServiceSpy },
        { provide: CouponService, useValue: couponServiceSpy },
        { provide: DistanceService, useValue: distanceServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ControllerService, useValue: controllerServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    reversGeoSpy = TestBed.inject(ReversGeodecoderService) as jasmine.SpyObj<ReversGeodecoderService>;
    couponSpy = TestBed.inject(CouponService) as jasmine.SpyObj<CouponService>;
    distSpy = TestBed.inject(DistanceService) as jasmine.SpyObj<DistanceService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    controlerSpy = TestBed.inject(ControllerService) as jasmine.SpyObj<ControllerService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success, error) => {
      const position = JSON.parse(JSON.stringify({
        coords: {
          latitude: 48.8584,
          longitude: 2.2945
        }
      }));
      success(position);
    });

    reversGeoSpy.getAddress.and.returnValue(of({
      address: {
        road: 'Test Road',
        city: 'Test City'
      }
    }));

    couponSpy.getAllCoupons.and.returnValue(of(JSON.parse(JSON.stringify(
      { id: 1, name: 'Coupon 1', kategorie: 'Food', preis: 10, artikelart: 'Grocery', abholzeit: '12:00', username: 'John Doe', latitude: 48.8584, longitude: 2.2945, distance: 0 })),
      JSON.parse(JSON.stringify({ id: 2, name: 'Coupon 2', kategorie: 'Food', preis: 20, artikelart: 'Electronics', abholzeit: '14:00', username: 'Jane Doe', latitude: 48.8584, longitude: 2.2945, distance: 0 }
    ))));

    distSpy.getDistance.and.callFake((coupon, currentPos) => {
      return { ...coupon, distance: Math.random() * 10 };  // Mock distance calculation
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current location and load coupons', () => {
    expect(component.latitude).toBe(48.8584);
    expect(component.longitude).toBe(2.2945);
    expect(component.currentCity).toBe('Test City');
    expect(component.currentStreet).toBe('Test Road');
    expect(component.isloaded).toBeFalse();
  });

  it('should toggle location status', () => {
    expect(component.isLocationOn).toBeTrue();
    component.locationStatus();
    expect(component.isLocationOn).toBeFalse();
    component.locationStatus();
    expect(component.isLocationOn).toBeTrue();
  });
});
