import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatChip,
    MatIcon
  ],
  template: `
    <div class="h-auto w-100 overflow-hidden margin-top-10px">
      <p class="text-center">
        Meine Coupons
      </p>
      <div style="overflow: scroll">

        <div class="d-flex justify-content-center">
          <mat-card class="w-90 d-flex justify-content-center">
            <mat-card-title class="w-100 text-center margin-top-10px" style="margin-top: 10px">
              Angebotstitel
              <mat-chip style="background-color: seagreen; float: right; margin-right: 10px;">STF</mat-chip>
            </mat-card-title>
            <mat-card-content>
              Produkttyp: Gemüsekiste <br>
              Abholzeit: 17:00-19:00 Uhr<br>
              Addresse: Name, Stadt, Strasse<br>
              <mat-chip style="background-color: seagreen; float: right; width: 50px">3€</mat-chip>
            </mat-card-content>
          </mat-card>
        </div>


      </div>
      <div class="fixed-bottom">
        <app-navbar></app-navbar>
      </div>
    </div>
  `,
  styleUrl: './coupon.component.scss'
})
export class CouponComponent {

  //TODO: Abfrage der reservierten Coupons
}
