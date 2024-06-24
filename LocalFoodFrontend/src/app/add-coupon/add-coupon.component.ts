import {Component, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NavbarComponent} from "../navbar/navbar.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddCoponentService} from "./service/add-coponent.service";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgxMatTimepickerComponent, NgxMatTimepickerDirective} from "ngx-mat-timepicker";

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    NavbarComponent,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxMatTimepickerComponent,
    NgxMatTimepickerDirective,
  ],
  template: `
    <div class="text-center margin-top-10px d-flex justify-content-center align-items-center">
      <mat-card class="w-auto h-50 align-items-center justify-content-center padding-left-right-10px">
        <mat-card-title class="text-center margin-bottom-10px txt-prim-color">
          Neuer Artikel anlegen
        </mat-card-title>
        <mat-card-content class="align-items-center justify-content-center">
          <form [formGroup]="artikelForm">
            <mat-button-toggle-group formControlName="kategorie" style="background-color: seagreen">
              <mat-button-toggle value="Safe the Food">Safe the Food</mat-button-toggle>
              <mat-button-toggle value="Erntefrisch">Erntefrisch</mat-button-toggle>
            </mat-button-toggle-group>
            <br><br>
            <mat-button-toggle-group formControlName="artikelart" style="background-color: seagreen">
              <mat-button-toggle value="Einzelprodukt">Einzelprodukt</mat-button-toggle>
              <mat-button-toggle value="Kiste">Kiste</mat-button-toggle>
            </mat-button-toggle-group>
            <br><br>
            <mat-form-field class="w-100">
              <mat-label>Artikelname</mat-label>
              <input matInput placeholder="Artikelname" formControlName="name">
            </mat-form-field>
            <br>
            <mat-form-field class="w-100">
              <mat-label>Preis</mat-label>
              <input matInput type="number" placeholder="3.0" formControlName="preis">
            </mat-form-field>
            <br>
            <mat-form-field class="w-100">
              <mat-label>Artikelbeschreibung</mat-label>
              <input matInput placeholder="Artikelbeschreibung" formControlName="beschreibung">
            </mat-form-field>
            <br>
            <br>
            <div>
              Abholzeit:<br>
              Von: <br>
              <mat-form-field>
                <input matInput
                       name="selected_time_Start"
                       [format]="24"
                       [(ngModel)]="selectedTimes.B"
                       [ngxMatTimepicker]="pickerStart"
                       placeholder="16:00"
                       readonly
                       formControlName="start"/>
                <mat-icon matSuffix
                          (click)="pickerStart.open()">
                  watch_later
                </mat-icon>
              </mat-form-field>
              <br>
              bis
              <br>
              <mat-form-field>
                <input matInput
                       name="selected_time_End"
                       [format]="24"
                       [(ngModel)]="selectedTimes.B"
                       [ngxMatTimepicker]="pickerEnd"
                       placeholder="16:00"
                       readonly
                       formControlName="end"/>
                <mat-icon matSuffix
                          (click)="pickerEnd.open()">
                  watch_later
                </mat-icon>
              </mat-form-field>
              <ngx-mat-timepicker
                #pickerStart
                [enableKeyboardInput]="true"
              ></ngx-mat-timepicker>
              <ngx-mat-timepicker
                #pickerEnd
                [enableKeyboardInput]="true">
              </ngx-mat-timepicker>
            </div>
            <br>
            <button mat-flat-button (click)="onSave()" id="js-SaveButton" style="background-color: seagreen">Speichern
            </button>

          </form>
        </mat-card-content>
      </mat-card>
    </div>
    <div class="fixed-bottom">
      <app-navbar></app-navbar>
    </div>
  `,
  styleUrl: './add-coupon.component.scss'
})
export class AddCouponComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private addCoupon: AddCoponentService) {
  }

  isLocationOn: boolean = true
  latitude: number = 0.0
  longitude: number = 0.0
  selectedTimes: any = 0

  artikelForm: FormGroup<
    {
      kategorie: FormControl,
      artikelart: FormControl,
      name: FormControl,
      beschreibung: FormControl,
      start: FormControl,
      end: FormControl,
      preis: FormControl
    }
  > = new FormGroup<
    {
      kategorie: FormControl,
      artikelart: FormControl,
      name: FormControl,
      beschreibung: FormControl,
      start: FormControl,
      end: FormControl,
      preis: FormControl
    }>(
    {
      kategorie: new FormControl('', [Validators.required]),
      artikelart: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      beschreibung: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      preis: new FormControl('', [Validators.required, Validators.min(1)]),
    })

  ngOnInit() {
    this.getCurrentCoordinates()
  }

  onSave() {
    if (!this.isLocationOn) {
      console.log("Geht wieso auch immer nicht")
      this.snackBar.open('Ortungsdienste müssen aktiviert sein, um einen Artikel zu erstellen.', "", {
        duration: 5000, // Die Snackbar wird nach 5 Sekunden automatisch geschlossen
      });
    } else {
      let kategorie = this.artikelForm.get('kategorie')?.value
      let artikelart = this.artikelForm.get('artikelart')?.value
      let name = this.artikelForm.get('name')?.value
      let beschreibung = this.artikelForm.get('beschreibung')?.value
      let start = this.artikelForm.get('start')?.value
      let end = this.artikelForm.get('end')?.value
      let preis = this.artikelForm.get('preis')?.value
      let timeSpan: string = start + "bis" + end
      this.addCoupon.addCopon(this.latitude, this.longitude, kategorie, artikelart, name, beschreibung, timeSpan, preis).subscribe(r => r)
      this.snackBar.open('Coupon wurde erstellt..', "", {
        duration: 5000,
      });
    }

  }


  getCurrentCoordinates() {
    if (navigator.geolocation && this.isLocationOn) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.isLocationOn = false;
            console.log("User denied the request for Geolocation.");
          } else {
            this.isLocationOn = false;
            console.log("Geolocation error: ", error.message);
          }
        })
    }
  }
}
