// File path: src/app/navbar/navbar.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { UserprofileService } from '../UserProfile/userprofile.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userProfileService: UserprofileService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([]),
        MatIconButton,
        MatIcon
      ],
      providers: [UserprofileService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    userProfileService = TestBed.inject(UserprofileService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to profile on onProfile', () => {
    spyOn(router, 'navigate');
    component.onProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/profil']);
  });

  it('should navigate to home on onHome', () => {
    spyOn(router, 'navigate');
    component.onHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to coupon on onCoupon', () => {
    spyOn(router, 'navigate');
    component.onCoupon();
    expect(router.navigate).toHaveBeenCalledWith(['/coupon']);
  });

  it('should navigate to addCoupon on onAddCoupon', () => {
    spyOn(router, 'navigate');
    component.onAddCoupon();
    expect(router.navigate).toHaveBeenCalledWith(['/addCoupon']);
  });

  it('should display different buttons based on user profile type', () => {
    userProfileService.setProfileType = false;
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#js-conformButton');
    expect(button).toBeTruthy();
    button = fixture.debugElement.nativeElement.querySelector('#js-conformAddButton');
    expect(button).toBeFalsy();

    userProfileService.setProfileType = true;
    fixture.detectChanges();
    button = fixture.debugElement.nativeElement.querySelector('#js-conformAddButton');
    expect(button).toBeTruthy();
  });
});
