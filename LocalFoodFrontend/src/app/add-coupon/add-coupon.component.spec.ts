// File path: src/app/add-coupon/add-coupon.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCouponComponent } from './add-coupon.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('AddCouponComponent', () => {
  let component: AddCouponComponent;
  let fixture: ComponentFixture<AddCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddCouponComponent,
        NavbarComponent,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.artikelForm.valid).toBeFalsy();
  });

  it('form should be valid when filled', () => {
    component.artikelForm.controls['kategorie'].setValue('TestKategorie');
    component.artikelForm.controls['artikelart'].setValue('Einzelprodukt');
    component.artikelForm.controls['name'].setValue('TestName');
    component.artikelForm.controls['beschreibung'].setValue('TestBeschreibung');
    expect(component.artikelForm.valid).toBeTruthy();
  });

  it('should call getCurrentCoordinates on onSave', () => {
    spyOn(component, 'getCurrentCoordinates').and.callThrough();
    component.onSave();
    expect(component.getCurrentCoordinates).toHaveBeenCalled();
  });
});
