import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "./loginServices/login-service.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import * as CryptoJS from "crypto-js";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {UserprofileService} from "../UserProfile/userprofile.service";


@Component({
  selector: 'app-login',
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
    RouterLink,
    RouterOutlet
  ],
  template: `
    <div class="d-flex justify-content-center align-items-center h-100 overflow-hidden">
      <mat-card class="w-auto h-50 align-items-center justify-content-center padding-left-right-10px">
        <mat-card-title class="text-center margin-bottom-10px txt-prim-color">
          Login
        </mat-card-title>
        <mat-card-content class="align-items-center justify-content-center">
          <form [formGroup]="loginForm">
            <mat-form-field class="w-100">
              <mat-label>E-Mail</mat-label>
              <input matInput placeholder="E-Mail" formControlName="email">
              <mat-icon matSuffix>  mail</mat-icon>
            </mat-form-field> <br>
            <mat-form-field class="w-100">
              <mat-label>Passwort</mat-label>
              <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hideEvent($event)" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide" id="js-hidePasswortButton" type="button">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>
            <br>
            <button mat-flat-button  (click)="onLogin()" id="js-loginButton" style="background-color: seagreen">Login</button>
            <div class="position-absolute bottom-0">
              <button mat-button color="primary" class="margin-bottom-5px start-100" (click)="onRegister()" id="js-registerButton">Registrieren</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './login.component.scss',
  providers:[HttpClient]
})
export class LoginComponent implements OnInit{
  logo = "../../assets/logo.png"
  hide : boolean = true;

  constructor(private login : LoginServiceService, private router: Router, private user : UserprofileService) {
  }

  loginForm: FormGroup<{ email: FormControl, password: FormControl }> =
    new FormGroup<{ email: FormControl; password: FormControl }>({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })

  ngOnInit() {
    //this.router.navigate(['/home'])
    this.user.getRememberMe()
    if (this.user.getIdentKey != undefined){
      this.login.loginRequest(this.user.getIdentKey.toString()).subscribe((response): void => {
        const js = JSON.stringify(response)
        const content = JSON.parse(js)
        this.user.setUserIdentKey = content.identKey
        this.user.setUserName = content.name
        this.user.setUserEmail = content.email
        this.user.setProfileType = content.profileType

        this.router.navigate(['/home'])
      }, error => {
        if (error.status == 401) {
          console.info("status is unauthorized")
        }
      })
    }
  }


  hideEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
 credentialKey : string = ""

  async onLogin() {
    this.credentialKey = CryptoJS.SHA256(this.loginForm.get('email')?.value + this.loginForm.get('password')?.value).toString(CryptoJS.enc.Hex);

    //this.router.navigate(['/home'])
    this.login.loginRequest(this.credentialKey).subscribe((response): void => {
      const js = JSON.stringify(response)
      const jsonObj = JSON.parse(js)

      this.user.setIdentKey = jsonObj.identKey
      this.user.setUserEmail = jsonObj.email
      this.user.setUserName = jsonObj.name
      this.user.setProfileType = jsonObj.profileType
      this.user.setRememberMe()

      this.router.navigate(['/home'])
    }, error => {
      if (error.status == 401) {
        console.info("status is unauthorized")
      }
    })
  }

  onRegister():void{
    console.log("registrieren seite aufreufen")
    this.router.navigate(['/register'])
  }
}
