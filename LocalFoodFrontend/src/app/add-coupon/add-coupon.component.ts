import { Component } from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    NavbarComponent
  ],
  template: `
    <div class="text-center margin-top-10px">
      <p>
        <mat-button-toggle-group name="fontStyle" aria-label="Font Style" style="background-color: seagreen">
          <mat-button-toggle value="true">Safe the Food</mat-button-toggle>
          <mat-button-toggle value="false">Erntefrisch</mat-button-toggle>
        </mat-button-toggle-group>
      </p>
    </div>
    <div class="fixed-bottom">
      <app-navbar></app-navbar>
    </div>
  `,
  styleUrl: './add-coupon.component.scss'
})
export class AddCouponComponent {

}
