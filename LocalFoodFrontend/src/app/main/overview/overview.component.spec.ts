import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {OverviewComponent} from './overview.component';
import {ReversGeodecoderService} from '../reversGeodecoder/revers-geodecoder.service';
import {CouponService} from '../CouponService/coupon.service';
import {ControllerService} from './overlayControl/controller.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let reversGeoSpy: jasmine.SpyObj<ReversGeodecoderService>;
  let couponSpy: jasmine.SpyObj<CouponService>;
  let controllerSpy: jasmine.SpyObj<ControllerService>;

  beforeEach(waitForAsync(() => {
    const reversGeoServiceSpy = jasmine.createSpyObj('ReversGeodecoderService', ['getAddress']);
    const couponServiceSpy = jasmine.createSpyObj('CouponService', ['addCoupons', 'deleteMyCoupon']);
    const controllerServiceSpy = jasmine.createSpyObj('ControllerService', [], {isBooking: true});

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        OverviewComponent,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatIconModule
      ],
      providers: [
        {provide: ReversGeodecoderService, useValue: reversGeoServiceSpy},
        {provide: CouponService, useValue: couponServiceSpy},
        {provide: ControllerService, useValue: controllerServiceSpy},
        {provide: MAT_DIALOG_DATA, useValue: {latitude: 48.8584, longitude: 2.2945, name: 'Test Coupon', kategorie: 'Food', preis: 10, artikelart: 'Grocery', abholzeit: '12:00', username: 'John Doe', id: 1}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    reversGeoSpy = TestBed.inject(ReversGeodecoderService) as jasmine.SpyObj<ReversGeodecoderService>;
    couponSpy = TestBed.inject(CouponService) as jasmine.SpyObj<CouponService>;
    controllerSpy = TestBed.inject(ControllerService) as jasmine.SpyObj<ControllerService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    reversGeoSpy.getAddress.and.returnValue(of({
      address: {
        road: 'Test Road',
        house_number: '123',
        postcode: '12345',
        city: 'Test City'
      }
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with address details', () => {
    expect(component.street).toBe('Test Road');
    expect(component.housNumber).toBe('123');
    expect(component.postCode).toBe('12345');
    expect(component.city).toBe('Test City');
  });
});
