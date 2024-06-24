import { Component } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-einloesen-conefermation',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>Coupon Einlösen</h2>
    <mat-dialog-content>Bist du sicher, dass du den Coupon einlösen möchtest?</mat-dialog-content>
    <mat-dialog-actions>
      <button  mat-flat-button (click)="onNoClick()" style="background-color: lightgreen">Abbrechen</button>
      <button mat-flat-button [mat-dialog-close]="true" cdkFocusInitial color="warn">Bestätigen</button>
    </mat-dialog-actions>
  `,
  styleUrl: './einloesen-conefermation.component.scss'
})
export class EinloesenConefermationComponent {
  constructor(public dialogRef: MatDialogRef<EinloesenConefermationComponent>, private dialog: MatDialog) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
