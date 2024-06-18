import {Component, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NavbarComponent} from "../navbar/navbar.component";
import {Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddCoponentService} from "./service/add-coponent.service";

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
    ReactiveFormsModule
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
            </mat-button-toggle-group><br><br>
            <mat-button-toggle-group formControlName="artikelart" style="background-color: seagreen">
              <mat-button-toggle value="Einzelprodukt">Einzelprodukt</mat-button-toggle>
              <mat-button-toggle value="Kiste">Kiste</mat-button-toggle>
            </mat-button-toggle-group><br><br>
            <mat-form-field class="w-100">
              <mat-label>Artikelname</mat-label>
              <input matInput placeholder="Artikelname" formControlName="name">
            </mat-form-field> <br>
            <mat-form-field class="w-100">
              <mat-label>Artikelbeschreibung</mat-label>
              <input matInput placeholder="Artikelbeschreibung" formControlName="beschreibung">
            </mat-form-field> <br>
            <br>
            <button mat-flat-button  (click)="onSave()" id="js-SaveButton" style="background-color: seagreen">Speichern</button>
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
export class AddCouponComponent implements OnInit{
  constructor(private snackBar:MatSnackBar, private addCoupon : AddCoponentService) {
  }
  isLocationOn :boolean = true
  latitude :number = 0.0
  longitude : number = 0.0
  artikelForm: FormGroup<{ kategorie: FormControl, artikelart: FormControl, name: FormControl, beschreibung: FormControl }> =
    new FormGroup<{ kategorie: FormControl, artikelart: FormControl, name: FormControl; beschreibung: FormControl }>({
      kategorie : new FormControl('', [Validators.required]),
      artikelart: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      beschreibung: new FormControl('', [Validators.required]),

    })

  ngOnInit() {
    this.getCurrentCoordinates()
  }

  onSave(){
    if (!this.isLocationOn){
      console.log("Geht wieso auch immer nicht")
      this.snackBar.open('Ortungsdienste müssen aktiviert sein, um einen Artikel zu erstellen.',"", {
        duration: 5000, // Die Snackbar wird nach 5 Sekunden automatisch geschlossen
      });
    } else {
      var kategorie = this.artikelForm.get('kategorie')?.value
      var artikelart = this.artikelForm.get('artikelart')?.value
      var name = this.artikelForm.get('name')?.value
      var beschreibung = this.artikelForm.get('beschreibung')?.value

      this.addCoupon.addCopon(this.latitude, this.longitude, kategorie, artikelart, name, beschreibung).subscribe(r => r)
      this.snackBar.open('Coupon wurde erstellt..',"", {
        duration: 5000, // Die Snackbar wird nach 5 Sekunden automatisch geschlossen
      });
    }

  }


  getCurrentCoordinates(){
    if(navigator.geolocation && this.isLocationOn){
      navigator.geolocation.getCurrentPosition((position)=>{
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
