import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegisterComponent,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with name, email, and password controls', () => {
    expect(component.registerForm.contains('name')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
  });

  it('should make the password field toggle visibility', () => {
    expect(component.hide).toBeTrue();
    component.hideEvent(new MouseEvent('click'));
    expect(component.hide).toBeFalse();
    component.hideEvent(new MouseEvent('click'));
    expect(component.hide).toBeTrue();
  });

  it('should show snackbar with error message if selectedOption is null', () => {
    component.selectedOption = false;
    component.onRegister();
    expect(snackBar.open).toHaveBeenCalledWith('Wählen sie die passende Kontoart', '', { duration: 3000 });
  });

  it('should navigate to /home if selectedOption is not null', () => {
    component.selectedOption = true
    component.onRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should submit the form if it is valid', () => {
    component.registerForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password'
    });
    component.selectedOption = true
    component.onRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
