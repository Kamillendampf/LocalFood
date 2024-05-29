import { Component } from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatChip,
    NavbarComponent
  ],
  template: `
    <div class="h-auto w-100 overflow-hidden">
      <div class="d-flex justify-content-center overflow-y-scroll">
        <mat-card class="w-90">
          <mat-card-title>
            Angebotstitel
            <mat-chip style="background-color: seagreen"></mat-chip>
          </mat-card-title>
        </mat-card>
      </div>
      <div class="position-absolute fixed-bottom">
        <app-navbar></app-navbar>
      </div>
    </div>

  `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
