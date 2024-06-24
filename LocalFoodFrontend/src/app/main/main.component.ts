import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {NavbarComponent} from "../navbar/navbar.component";
import {MatIcon} from "@angular/material/icon";
import {ReversGeodecoderService} from "./reversGeodecoder/revers-geodecoder.service";
import {CouponService} from "./CouponService/coupon.service";
import {CouponIf} from "./CouponInterface";
import {DistanceService} from "./Distance/distance.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {OverviewComponent} from "./overview/overview.component";
import {ControllerService} from "./overview/overlayControl/controller.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatChip,
    NavbarComponent,
    MatCardContent,
    MatIcon,
    MatProgressSpinner
  ],
  template: `
    <div class="h-auto w-100 overflow-hidden margin-top-10px">
      @if (isloaded) {
        <p>
          <mat-icon (click)="locationStatus()"
                    id="js-locationButton">{{ isLocationOn ? 'location_on' : 'location_off' }}
          </mat-icon>
          {{ isLocationOn ? currentCity + ',' + currentStreet : 'Ortungsdienste sind nicht verfügbar' }}
        </p>
        <div style="overflow: scroll">
          @for (coup of this.coupons; track coup) {
            <div class="d-flex justify-content-center" style="margin-bottom: 20px">
              <mat-card class="w-90 d-flex justify-content-center" (click)="openOverView(coup)">
                <mat-card-title class="w-100 text-center margin-top-10px" style="margin-top: 10px">
                  {{ coup.name }}
                  <mat-chip style="background-color: seagreen; float: right; margin-right: 10px;">{{ coup.kategorie }}
                  </mat-chip>
                </mat-card-title>
                <mat-card-content>
                  Produkttyp: {{ coup.artikelart }} <br>
                  Abholzeit: {{ coup.abholzeit }} Uhr<br>
                  Addresse: {{ coup.username }},<a
                  href="https://www.google.com/maps?q={{coup.latitude}},{{coup.longitude}}">
                  Maps</a><br>
                  <mat-chip style="background-color: seagreen; float: right; width: 70px">{{ coup.preis }}€</mat-chip>
                </mat-card-content>
              </mat-card>
            </div>
          }
        </div>
      } @else {
        <div class="d-flex justify-content-center align-items-center h-100" style="margin-bottom: 20px">
          <mat-spinner></mat-spinner>
        </div>
      }
      @if (isNavOn){
        <div class="fixed-bottom">
          <app-navbar></app-navbar>
        </div>
      }
    </div>
  `,
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  isLocationOn: boolean = true;
  latitude: number = 0.0;
  longitude: number = 0.0;
  currentStreet: string = "";
  currentCity: string = ''
  coupons: CouponIf[] = []
  isloaded = false
  isNavOn : boolean = this.controler.isNavOn


  constructor(private reversGeolocation: ReversGeodecoderService,
              private coupon: CouponService,
              private dist: DistanceService,
              private dialog: MatDialog,
              private controler : ControllerService) {
  }

  ngOnInit() {
    this.getCurrentCoordinates()
    this.isloaded = false

  }

  locationStatus() {
    this.isLocationOn = !this.isLocationOn;
    //this.getCurrentCoordinates()
  }

  getCurrentCoordinates() {
    if (navigator.geolocation && this.isLocationOn) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude
          this.isloaded = true
          this.getCurrentCityAndStreet(this.latitude, this.longitude)
          this.getAllCoupons()
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.isLocationOn = false;
            console.log("User denied the request for Geolocation.");
          } else {
            this.isLocationOn = false;
            console.log("Geolocation error: ", error.message);
          }
        })
    } else {
      this.currentCity = "";
      this.currentStreet = "";
    }
  }

  getCurrentCityAndStreet(latitude: number, longitude: number) {
    this.reversGeolocation.getAddress(latitude, longitude)
      .subscribe((data: any) => {
        this.currentStreet = data.address.road;
        this.currentCity = data.address.city || data.address.town || data.address.village || data.address.municipality;
      });
  }

  getAllCoupons() {
    this.coupon.getAllCoupons().subscribe(response => {
      const json = JSON.parse(JSON.stringify(response))
      this.sorteAllCouponsByDistance(json)
    })
  }

  sorteAllCouponsByDistance(coupons: CouponIf[]) {
    var currentPos: { latitude: number; longitude: number } = {latitude: this.latitude, longitude: this.longitude}
    this.coupons = []
    for (let coupon of coupons) {
      this.coupons.push(this.dist.getDistance(coupon, currentPos))
    }

    this.coupons.sort((a, b) => a.distance - b.distance);
    console.log("sortiert")
  }

  openOverView(coup: CouponIf) {
    this.controler.isBooking = true
    this.isNavOn = false
    this.dialog.open(OverviewComponent, {
      width: '90%',
      height: '90%',
      data: coup,
    });

    this.dialog.afterAllClosed.subscribe(r => {
      this.isNavOn = true
    })
  }
}
