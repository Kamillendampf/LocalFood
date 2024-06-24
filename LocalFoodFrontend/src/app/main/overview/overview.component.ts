import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CouponIf} from "../CouponInterface";
import {MatChip} from "@angular/material/chips";
import {ReversGeodecoderService} from "../reversGeodecoder/revers-geodecoder.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import * as L from 'leaflet';
import {CouponService} from "../CouponService/coupon.service";
import {ControllerService} from "./overlayControl/controller.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {
  EinloesenConefermationComponent
} from "../../confermation/einloesen-conefermation/einloesen-conefermation.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatChip,
    MatAnchor,
    MatButton,
    MatSlideToggle,
    MatIcon
  ],
  template: `
    <div class="w-100 h-100">
      <mat-icon (click)="this.dialogRef.close()" style="margin-left: 20px; margin-top: 20px; width: 40px; height: 40px">
        arrow_circle_left
      </mat-icon>
      <div class="w-100" style="margin-top: 50px; text-align: center">
        {{ this.data.name }}
      </div>
      <div class="w-100 d-flex justify-content-center" style="margin-top: 40px; text-align: center">
        <mat-chip style="background-color: seagreen; float: right; margin-right: 10px;">{{ this.data.kategorie }}
        </mat-chip>
        <mat-chip style="background-color: seagreen; float: right; width: 70px">{{ this.data.preis }}€</mat-chip>
      </div>
      <div class="w-100" style="margin-top: 40px; text-align: center">
        Produkttyp: {{ this.data.artikelart }} <br>
        Abholzeit: {{ this.data.abholzeit }} Uhr<br>
      </div>

      <div class="w-100" style="margin-top: 40px; text-align: center">
        Addresse: {{ this.data.username }},<br> {{ this.street }}{{ this.housNumber }}, <br>
        {{ this.postCode }} {{ this.city }}
        <br>
        <br>
        @if (isBooking) {
          <button mat-flat-button (click)="book(this.data.id)" id="js-bookButton" style="background-color: seagreen">
            Buchen
          </button>
        } @else {
          <button mat-flat-button (click)="deletCoupon(this.data.id )" id="js-einoesenButton" style="background-color: seagreen">
            Einlösen
          </button>
        }

        <br>
        <br>
        <a mat-flat-button style="background-color: seagreen"
           href="https://www.google.com/maps?q={{this.data.latitude}},{{this.data.longitude}}">
          Maps</a><br>
      </div>
      <div class="w-100 d-flex justify-content-center"
           style="margin-top: 30px; text-align: center; margin-bottom: 30px; border-radius: 20px">
        <div id="map" style="width: 80%; height: 300px">
        </div>
      </div>


    </div>

  `,
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements AfterViewInit {

  street: string = ''
  city: string = ''
  housNumber: string = ''
  postCode: string = ''

  public map: any = "";
  public isBooking = this.controler.isBooking

  constructor(private reversGeo: ReversGeodecoderService,
              @Inject(MAT_DIALOG_DATA) public data: CouponIf,
              private coupon: CouponService,
              private readonly controler: ControllerService,
              public dialogRef: MatDialogRef<OverviewComponent>,
              public confDial : MatDialog) {
  }

  ngAfterViewInit() {
    this.reversGeo.getAddress(this.data.latitude, this.data.longitude).subscribe((adr: any) => {
      console.log(JSON.stringify(adr))
      this.street = adr.address.road;
      this.housNumber = adr.address.house_number
      this.postCode = adr.address.postcode
      this.city = adr.address.city || adr.address.town || adr.address.village || adr.address.municipality;
    })

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    var map = L.map('map').setView([this.data.latitude, this.data.longitude], 30);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([this.data.latitude, this.data.longitude]).addTo(map);
  }

  book(coupID: number) {
    this.coupon.addCoupons(coupID).subscribe(r => r)
  }

  deletCoupon(id : number){
    const dialogConf : MatDialogRef<EinloesenConefermationComponent> = this.confDial.open(EinloesenConefermationComponent)

    dialogConf.afterClosed().subscribe(r =>{
      if (r){
        console.log("der nutzer hat zu gestimmt den coupon zu löschen.")
        this.coupon.deleteMyCoupon(id).subscribe(r => r)
        this.dialogRef.close()
      }
    })

  }

}
