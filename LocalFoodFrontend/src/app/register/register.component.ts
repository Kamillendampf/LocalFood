import {Component} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegisterService} from "./register.service";
import * as CryptoJS from "crypto-js";
import {UserprofileService} from "../UserProfile/userprofile.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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
    RouterOutlet,
    MatRadioGroup,
    FormsModule,
    MatRadioButton
  ],
  template: `
    <div class="d-flex justify-content-center align-items-center h-100">
      <mat-card class="w-auto h-auto align-items-center justify-content-center padding-left-right-10px">
        <mat-card-title class="text-center margin-bottom-10px txt-prim-color">Registrieren</mat-card-title>
        <mat-card-content class="align-items-center justify-content-center">
          <mat-label>Wählen sie ihre Konotart:</mat-label><br>
          <mat-radio-group [(ngModel)]="selectedOption">
            <mat-radio-button value="true">Unternehmen</mat-radio-button>
            <mat-radio-button value="false">Privat</mat-radio-button>
          </mat-radio-group>
          <form [formGroup]="registerForm">
            <mat-form-field class="w-100">
              <mat-label>Vor-/Nachname</mat-label>
              <input matInput placeholder="Vor-/Nachname" formControlName="name">
              <mat-icon matSuffix>person</mat-icon>
            </mat-form-field> <br>
            <mat-form-field class="w-100">
              <mat-label>E-Mail</mat-label>
              <input matInput placeholder="E-Mail" formControlName="email">
              <mat-icon matSuffix>mail</mat-icon>
            </mat-form-field> <br>
            <mat-form-field class="w-100">
              <mat-label>Passwort</mat-label>
              <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hideEvent($event)" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide" id="js-hidePasswortButton" type="button">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>
            <br>
            <button mat-flat-button  (click)="onRegister()" id="js-register" style="background-color: seagreen">Registrieren</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true
  selectedOption: boolean = false;
  constructor(private router: Router, private snackbar: MatSnackBar, private register : RegisterService,
  private userProfil: UserprofileService) {
  }

  registerForm: FormGroup<{ name: FormControl, email: FormControl, password: FormControl }> =
    new FormGroup<{ name: FormControl, email: FormControl; password: FormControl }>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  onRegister() {
    //TODO: Füge den code für das übertragen von den neuen Nutzerdaten an den Server ein.
    if (this.selectedOption && this.registerForm.get('name')?.value !== "" && this.registerForm.get('email')?.value !== "" && this.registerForm.get('password')?.value !== "") {
      this.registerUser()
    } else {
      this.snackbar.open('Wählen sie die passende Kontoart', '', {duration: 3000});
    }
  }

  hideEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  async registerUser() {
      const username = this.registerForm.get('name')?.value;
      const email = this.registerForm.get('email')?.value;
      console.log(email)
      const password = this.registerForm.get('password')?.value;

      const profileType: boolean = this.selectedOption

      const identKey = CryptoJS.SHA256(email + password).toString(CryptoJS.enc.Hex)

      this.userProfil.setUserIdentKey = identKey
      this.register.registerUser(identKey, username, email, profileType).subscribe((response): void => {
        this.router.navigate(['/home'])
      }, error => {
        if (error.status == 405) {
          this.snackbar.open('Bei der Übermittlung der Informationen ist ein Fehler aufgetreten.', '', {duration: 3000});
        }
      })
    }
}
