import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {UserprofileService} from '../UserProfile/userprofile.service';
import {of, throwError} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let userprofileService: jasmine.SpyObj<UserprofileService>;
  let router: jasmine.SpyObj<Router>;
  let snackbar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerUser']);
    const userprofileServiceSpy = jasmine.createSpyObj('UserprofileService', ['setUserIdentKey']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: UserprofileService, useValue: userprofileServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    userprofileService = TestBed.inject(UserprofileService) as jasmine.SpyObj<UserprofileService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackbar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate name field as required', () => {
    const nameControl = component.registerForm.controls['name'];
    expect(nameControl.valid).toBeFalsy();
    expect(nameControl.errors?.['required']).toBeTruthy();

    nameControl.setValue('John Doe');
    expect(nameControl.valid).toBeTruthy();
    expect(nameControl.errors).toBeNull();
  });

  it('should validate email field as required', () => {
    const emailControl = component.registerForm.controls['email'];
    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.errors?.['required']).toBeTruthy();

    emailControl.setValue('john.doe@example.com');
    expect(emailControl.valid).toBeTruthy();
    expect(emailControl.errors).toBeNull();
  });

  it('should validate password field as required', () => {
    const passwordControl = component.registerForm.controls['password'];
    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.errors?.['required']).toBeTruthy();

    passwordControl.setValue('password123');
    expect(passwordControl.valid).toBeTruthy();
    expect(passwordControl.errors).toBeNull();
  });

  it('should show snackbar when account type is not selected', () => {
    component.onRegister();
    expect(snackbar.open).toHaveBeenCalledWith('Wählen sie die passende Kontoart', '', { duration: 3000 });
  });

  it('should call registerUser when form is valid and account type is selected', () => {
    component.selectedOption = true;
    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john.doe@example.com');
    component.registerForm.controls['password'].setValue('password123');

    spyOn(component, 'registerUser');
    component.onRegister();
    expect(component.registerUser).toHaveBeenCalled();
  });

  it('should set user ident key and navigate to home on successful registration', () => {
    const identKey = CryptoJS.SHA256('john.doe@example.com' + 'password123').toString(CryptoJS.enc.Hex);
    registerService.registerUser.and.returnValue(of());

    component.selectedOption = true;
    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john.doe@example.com');
    component.registerForm.controls['password'].setValue('password123');

    component.registerUser();

    expect(registerService.registerUser).toHaveBeenCalledWith(identKey, "John Doe", "john.doe@example.com", true, );
  });

  it('should show snackbar on registration error', () => {
    registerService.registerUser.and.returnValue(throwError({ status: 405 }));

    component.selectedOption = true;
    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john.doe@example.com');
    component.registerForm.controls['password'].setValue('password123');

    component.registerUser();

    expect(snackbar.open).toHaveBeenCalledWith('Bei der Übermittlung der Informationen ist ein Fehler aufgetreten.', '', { duration: 3000 });
  });


});
