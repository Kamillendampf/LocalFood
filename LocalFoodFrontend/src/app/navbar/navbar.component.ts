import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    RouterOutlet
  ],
  template: `
    @if (false){
   <div class="w-100 h-auto d-flex justify-content-center bc-prim-color">
     <div class="w-33 d-flex justify-content-center">
       <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-profileButton" (click)="onProfile()">
         <mat-icon>person</mat-icon>
       </button>
     </div>
     <div class="w-33 d-flex justify-content-center">
       <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-homeButton" (click)="onHome()">
         <mat-icon>home</mat-icon>
       </button>
       </div>
     <div class="w-33 d-flex justify-content-center">
       <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-conformButton" (click)="onCoupon()">
         <mat-icon>confirmation_num</mat-icon>
       </button>
    </div>
   </div>
    } @else {
      <div class="w-100 h-auto d-flex justify-content-center bc-prim-color">
        <div class="w-33 d-flex justify-content-center">
          <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-profileButton" (click)="onProfile()">
            <mat-icon>person</mat-icon>
          </button>
        </div>
        <div class="w-33 d-flex justify-content-center">
          <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-homeButton" (click)="onHome()">
            <mat-icon>home</mat-icon>
          </button>
        </div>
        <div class="w-33 d-flex justify-content-center">
          <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-conformAddButton" (click)="onAddCoupon()">
            <mat-icon>add_circle_outline</mat-icon>
          </button>
        </div>
        <div class="w-33 d-flex justify-content-center">
          <button mat-icon-button style="background-color: seagreen; color: floralwhite; height: 60px; width: 60px;" id="js-conformButton" (click)="onCoupon()">
            <mat-icon>confirmation_num</mat-icon>
          </button>
        </div>
      </div>
    }
   <router-outlet></router-outlet>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) {}
  onProfile(){
    this.router.navigate(['/profil'])
  }

  onHome(){
    this.router.navigate(['/home'])
  }
  onCoupon(){
    this.router.navigate(['/coupon'])
  }

  onAddCoupon(){
    this.router.navigate(['/addCoupon'])
  }
}
