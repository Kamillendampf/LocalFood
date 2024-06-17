import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {NavbarComponent} from "../navbar/navbar.component";
import {MatIcon} from "@angular/material/icon";
import {ReversGeodecoderService} from "./reversGeodecoder/revers-geodecoder.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatChip,
    NavbarComponent,
    MatCardContent,
    MatIcon
  ],
  template: `
    <div class="h-auto w-100 overflow-hidden margin-top-10px">
      <p>
        <mat-icon (click)="locationStatus()" id="js-locationButton">{{ isLocationOn ? 'location_on' : 'location_off' }}</mat-icon>
        {{ isLocationOn ? currentCity + ',' + currentStreet : 'Ortungsdienste sind nicht verfügbar' }}
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
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  isLocationOn : boolean = true;
  latitude : number = 0.0;
  longitude : number = 0.0;
  currentStreet : string = "";
  currentCity : string = ''


  constructor(private reversGeolocation : ReversGeodecoderService) {
  }

  ngOnInit() {
    this.getCurrentCoordinates()
  }

  locationStatus(){

      this.isLocationOn = !this.isLocationOn;
      this.getCurrentCoordinates()

  }

  getCurrentCoordinates(){
    if(navigator.geolocation && this.isLocationOn){
  navigator.geolocation.getCurrentPosition((position)=>{
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude
    this.getCurrentCityAndStreet(this.latitude, this.longitude)
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
    }else {
      this.currentCity = "";
      this.currentStreet = "";
    }
  }

  async getCurrentCityAndStreet(latitude : number, longitude : number) {
    this.reversGeolocation.getAddress(latitude, longitude)
      .subscribe((data: any) => {
        this.currentStreet = data.address.road;
        this.currentCity = data.address.city || data.address.town || data.address.village || data.address.municipality;
      });
  }

  //TODO: Eine Methode einfügen zum abfragen der einzelnen Angebote und sortieren nach entfernung

}
