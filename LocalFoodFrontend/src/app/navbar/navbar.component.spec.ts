import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render profile, home, and coupon buttons', () => {
    const profileButton = fixture.debugElement.query(By.css('#js-profileButton'));
    const homeButton = fixture.debugElement.query(By.css('#js-homeButton'));
    const couponButton = fixture.debugElement.query(By.css('#js-conformButton'));

    expect(profileButton).toBeTruthy();
    expect(profileButton.nativeElement.querySelector('mat-icon').textContent).toBe('person');

    expect(homeButton).toBeTruthy();
    expect(homeButton.nativeElement.querySelector('mat-icon').textContent).toBe('home');

    expect(couponButton).toBeTruthy();
    expect(couponButton.nativeElement.querySelector('mat-icon').textContent).toBe('confirmation_num');
  });

  it('should navigate to /profil when profile button is clicked', () => {
    const profileButton = fixture.debugElement.query(By.css('#js-profileButton'));
    profileButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/profil']);
  });

  it('should navigate to /home when home button is clicked', () => {
    const homeButton = fixture.debugElement.query(By.css('#js-homeButton'));
    homeButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /coupon when coupon button is clicked', () => {
    const couponButton = fixture.debugElement.query(By.css('#js-conformButton'));
    couponButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/coupon']);
  });

  it('should navigate to /coupon when coupon button is clicked', () => {
    const couponButton = fixture.debugElement.query(By.css('#js-conformAddButton'));
    couponButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/addCoupon']);
  });
});
