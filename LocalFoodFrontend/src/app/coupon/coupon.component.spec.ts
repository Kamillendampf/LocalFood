import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ReversGeodecoderService } from '../main/reversGeodecoder/revers-geodecoder.service';
import { CouponService } from '../main/CouponService/coupon.service';
import { DistanceService } from '../main/Distance/distance.service';
import { ControllerService } from '../main/overview/overlayControl/controller.service';
import { CouponComponent } from './coupon.component';
import { Overlay } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

describe('CouponComponent', () => {
  let component: CouponComponent;
  let fixture: ComponentFixture<CouponComponent>;
  let reversGeodecoderServiceSpy: jasmine.SpyObj<ReversGeodecoderService>;
  let couponServiceSpy: jasmine.SpyObj<CouponService>;
  let distanceServiceSpy: jasmine.SpyObj<DistanceService>;
  let controllerServiceSpy: jasmine.SpyObj<ControllerService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const reversGeodecoderSpy = jasmine.createSpyObj('ReversGeodecoderService', ['getAddress']);
    const couponSpy = jasmine.createSpyObj('CouponService', ['getMyCoupons']);
    const distanceSpy = jasmine.createSpyObj('DistanceService', ['calculateDistance']);
    const controllerSpy = jasmine.createSpyObj('ControllerService', [], { isBooking: false });
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'], { url: '/current-url' });

    await TestBed.configureTestingModule({
      imports: [
        CouponComponent,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        { provide: ReversGeodecoderService, useValue: reversGeodecoderSpy },
        { provide: CouponService, useValue: couponSpy },
        { provide: DistanceService, useValue: distanceSpy },
        { provide: ControllerService, useValue: controllerSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: MatDialog, useValue: dialogSpy },
        Overlay
      ]
    }).compileComponents();

    reversGeodecoderServiceSpy = TestBed.inject(ReversGeodecoderService) as jasmine.SpyObj<ReversGeodecoderService>;
    couponServiceSpy = TestBed.inject(CouponService) as jasmine.SpyObj<CouponService>;
    distanceServiceSpy = TestBed.inject(DistanceService) as jasmine.SpyObj<DistanceService>;
    controllerServiceSpy = TestBed.inject(ControllerService) as jasmine.SpyObj<ControllerService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle geolocation permission Allowed', fakeAsync(() => {
    component.getCurrentCoordinates();
    tick();

    expect(component.isLocationOn).toBeTrue();
  }));

  it('should open the overview dialog when a coupon is clicked', () => {
    const mockCoupon = JSON.parse(JSON.stringify({ name: 'Test Coupon', kategorie: 'Test Category', artikelart: 'Test Artikelart', abholzeit: '10:00', username: 'Test User', latitude: 10, longitude: 20, preis: 100 }));
    component.coupons = [mockCoupon];
    fixture.detectChanges();

    // Use fixture.whenStable() to ensure the DOM updates are complete
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const card = fixture.debugElement.query(By.css('mat-card'));

        card.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(matDialogSpy.open).toHaveBeenCalled();
        expect(matDialogSpy.open.calls.mostRecent().args[1]?.data).toEqual(mockCoupon);

    });
  });


});
