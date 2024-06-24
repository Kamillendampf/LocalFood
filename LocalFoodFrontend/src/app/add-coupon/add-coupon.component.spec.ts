import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddCouponComponent } from './add-coupon.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AddCoponentService } from './service/add-coponent.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AddCouponComponent', () => {
  let component: AddCouponComponent;
  let fixture: ComponentFixture<AddCouponComponent>;
  let snackBar: MatSnackBar;
  let addCoponentService: AddCoponentService;

  beforeEach(async () => {
    const snackBarMock = { open: jasmine.createSpy('open') };
    const addCoponentServiceMock = {
      addCopon: jasmine.createSpy('addCopon').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        AddCouponComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: AddCoponentService, useValue: addCoponentServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCouponComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    addCoponentService = TestBed.inject(AddCoponentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.artikelForm).toBeDefined();
    expect(component.artikelForm.controls['kategorie']).toBeDefined();
    expect(component.artikelForm.controls['artikelart']).toBeDefined();
    expect(component.artikelForm.controls['name']).toBeDefined();
    expect(component.artikelForm.controls['beschreibung']).toBeDefined();
    expect(component.artikelForm.controls['start']).toBeDefined();
    expect(component.artikelForm.controls['end']).toBeDefined();
    expect(component.artikelForm.controls['preis']).toBeDefined();
  });

  it('should show a snackbar if location is off', () => {
    component.isLocationOn = false;
    component.onSave();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Ortungsdienste müssen aktiviert sein, um einen Artikel zu erstellen.',
      '',
      { duration: 5000 }
    );
  });

  it('should call addCopon if form is valid and location is on', () => {
    component.isLocationOn = true;
    component.artikelForm.setValue({
      kategorie: 'food',
      artikelart: 'fruit',
      name: 'apple',
      beschreibung: 'fresh apple',
      start: '08:00',
      end: '12:00',
      preis: 5
    });

    component.latitude = 50.0;
    component.longitude = 8.0;

    component.onSave();

    const preis = 5
    expect(addCoponentService.addCopon).toHaveBeenCalledWith(
      50.0,
      8.0,
      'food',
      'fruit',
      'apple',
      'fresh apple',
      '08:00bis12:00',
      5
    );
    expect(snackBar.open).toHaveBeenCalledWith('Coupon wurde erstellt..', '', { duration: 5000 });
  });

  it('should get current coordinates', (done) => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successCallback) => {
      const position = {
        coords: {
          latitude: 0.0,
          longitude: 0.0
        }
      };
      expect(component.latitude).toBe(0.0);
      expect(component.longitude).toBe(0.0);
      done();
    });

    component.getCurrentCoordinates();
  });
});
