  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginServiceService} from "./loginServices/login-service.service";
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as CryptoJS from "crypto-js";
import {of, throwError} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginServiceService', ['loginRequest']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginServiceService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginServiceService) as jasmine.SpyObj<LoginServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the password field toggle visibility', () => {
    expect(component.hide).toBeTrue();
    component.hideEvent(new MouseEvent('click'));
    expect(component.hide).toBeFalse();
  });

  it('should navigate to /register on register button click', () => {
    component.onRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should handle 401 error', async () => {
    // Mock form values
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });

    // Mock the loginRequest to return an error with status 401
    loginService.loginRequest.and.returnValue(throwError({ status: 401 }));

    // Spy on console.info
    spyOn(console, 'info');

    await component.onLogin();

    expect(console.info).toHaveBeenCalledWith('status is unauthorized');
  });
});
