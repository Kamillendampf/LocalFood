import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {UserprofileService} from "../UserProfile/userprofile.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatButton
  ],
  template: `
    <div class="d-flex justify-content-center align-items-center h-100 overflow-hidden">
     <mat-card class="w-auto h-50 align-items-center justify-content-center padding-left-right-10px">
       <mat-card-title class="text-center margin-bottom-10px txt-prim-color">
         Profil <br>
         <i class="bi-person-circle"></i>
       </mat-card-title>
       <mat-card-content  class="align-items-center justify-content-center">
         Name: {{this.user.getUserName}} <br>
         E-Mail: {{this.user.getUserEmail}} <br>
         Account Typ: {{this.user.getProfileType}}<br>
         <button mat-flat-button style="background-color: seagreen" (click)="logout()"> Logout </button>
       </mat-card-content>
     </mat-card>
    </div>

    <div class="position-absolute fixed-bottom">
      <app-navbar></app-navbar>
    </div>
  `,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
 constructor(public user: UserprofileService, private router :Router) {
 }

 logout(){
   localStorage.removeItem("key")
   const currentUrl = this.router.url;
   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
     this.router.navigate(['/login']);
   });
 }
}
