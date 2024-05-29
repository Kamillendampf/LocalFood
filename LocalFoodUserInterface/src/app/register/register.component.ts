import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";

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
    RouterOutlet
  ],
  template: `
    <div class="d-flex justify-content-center align-items-center h-100">
      <mat-card class="w-auto h-auto align-items-center justify-content-center padding-left-right-10px">
        <mat-card-title class="text-center margin-bottom-10px txt-prim-color">Registrieren</mat-card-title>
        <mat-card-content class="align-items-center justify-content-center">
          <form [formGroup]="registerForm">
            <mat-form-field class="w-100">
              <mat-label>Vor-/Nachname</mat-label>
              <input matInput placeholder="E-Mail" formControlName="name">
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
  constructor(private router: Router) {
  }

  registerForm: FormGroup<{ name: FormControl, email: FormControl, password: FormControl }> =
    new FormGroup<{ name: FormControl, email: FormControl; password: FormControl }>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  onRegister(){
    this.router.navigate(['/home'])
  }
  hideEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
