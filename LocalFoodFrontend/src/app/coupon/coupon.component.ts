import {Component} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CouponIf} from "../main/CouponInterface";
import {ReversGeodecoderService} from "../main/reversGeodecoder/revers-geodecoder.service";
import {CouponService} from "../main/CouponService/coupon.service";
import {DistanceService} from "../main/Distance/distance.service";
import {MatDialog} from "@angular/material/dialog";
import {OverviewComponent} from "../main/overview/overview.component";
import {ControllerService} from "../main/overview/overlayControl/controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatChip,
    MatIcon,
    MatProgressSpinner
  ],
  template: `
    <div class="h-auto w-100 overflow-hidden margin-top-10px">
      @if (isloaded) {
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
  styleUrl: './coupon.component.scss'
})
export class CouponComponent {

  isLocationOn: boolean = true;
  latitude: number = 0.0;
  longitude: number = 0.0;
  currentStreet: string = "";
  currentCity: string = ''
  coupons: CouponIf[] = []
  isloaded = false
  isNavOn = true


  constructor(private reversGeolocation: ReversGeodecoderService,
              private coupon: CouponService,
              private dist: DistanceService,
              private dialog: MatDialog,
              private controler: ControllerService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentCoordinates()
    this.isloaded = false

  }


  getCurrentCoordinates() {
    if (navigator.geolocation && this.isLocationOn) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude
          this.isloaded = true
          this.getCurrentCityAndStreet(this.latitude, this.longitude)
          this.getMyCoupons()
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

  getMyCoupons() {
    this.coupon.getMyCoupons().subscribe(response => {
      const json = JSON.parse(JSON.stringify(response))
      this.coupons = json
    })
  }
  updatePage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  openOverView(coup: CouponIf) {
    this.controler.isBooking = false
    this.isNavOn = false
    this.dialog.open(OverviewComponent, {
      width: '90%',
      height: '90%',
      data: coup,
    });

    this.dialog.afterAllClosed.subscribe(r => {
      this.isNavOn = true
      this.updatePage()
    })
  }
}
