// File path: src/app/login/login.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { LoginServiceService } from './loginServices/login-service.service';
import { UserprofileService } from '../UserProfile/userprofile.service';
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginServiceService;
  let userprofileService: UserprofileService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LoginServiceService, UserprofileService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginServiceService);
    userprofileService = TestBed.inject(UserprofileService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid when filled', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call onLogin and navigate to home on success', fakeAsync(() => {
    spyOn(loginService, 'loginRequest').and.returnValue(of(JSON.parse(JSON.stringify({
      identKey: 12345,
      email: "test@example.com",
      name: "Test User",
      profileType: "user"
      }))))
    spyOn(router, 'navigate');

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    component.onLogin();
    tick();

    expect(loginService.loginRequest).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login error', fakeAsync(() => {
    spyOn(component, 'onLogin').and.callThrough();
    spyOn(loginService, 'loginRequest').and.returnValue(throwError({ status: 401 }));
    spyOn(console, 'info');

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onLogin();
    tick();

    expect(component.onLogin).toHaveBeenCalled();
    expect(loginService.loginRequest).toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith('status is unauthorized');
  }));

  it('should call onRegister and navigate to register', () => {
    spyOn(component, 'onRegister').and.callThrough();
    spyOn(router, 'navigate');

    component.onRegister();

    expect(component.onRegister).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should toggle password visibility', () => {
    component.hide = true;
    component.hideEvent(new MouseEvent('click'));
    expect(component.hide).toBeFalse();

    component.hideEvent(new MouseEvent('click'));
    expect(component.hide).toBeTrue();
  });
});
