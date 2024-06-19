import {Component, Inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CouponIf} from "../CouponInterface";
import {MatChip} from "@angular/material/chips";
import {ReversGeodecoderService} from "../reversGeodecoder/revers-geodecoder.service";
import {MatAnchor} from "@angular/material/button";


declare const L : any
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatChip,
    MatAnchor
  ],
  template: `
    <div class="w-100 h-100">
      <div class="w-100" style="margin-top: 50px; text-align: center">
        {{ this.data.name }}
        </div>
      <div class="w-100 d-flex justify-content-center" style="margin-top: 40px; text-align: center">
        <mat-chip style="background-color: seagreen; float: right; margin-right: 10px;">{{ this.data.kategorie }}</mat-chip>
        <mat-chip style="background-color: seagreen; float: right; width: 70px">{{ this.data.preis }}€</mat-chip>
      </div>
      <div class="w-100" style="margin-top: 40px; text-align: center" >
        Produkttyp: {{ this.data.artikelart }} <br>
        Abholzeit: {{ this.data.abholzeit }} Uhr<br>
      </div>

      <div class="w-100" style="margin-top: 40px; text-align: center">
        Addresse: {{ this.data.username }},<br> {{this.street}}{{this.housNumber}}, <br>
        {{this.postCode}} {{this.city}}
        <br>
        <a mat-flat-button style="background-color: seagreen"
          href="https://www.google.com/maps?q={{this.data.latitude}},{{this.data.longitude}}">
          Maps</a><br>
      </div>
      <div class="w-100 d-flex justify-content-center" style="margin-top: 30px; text-align: center">
        <div id="map" style="width: 95%; height: 200px">
         </div>
      </div>


    </div>

  `,
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

  street : string = ''
  city : string = ''
  housNumber : string = ''
  postCode : string = ''

  constructor(private reversGeo: ReversGeodecoderService,  @Inject(MAT_DIALOG_DATA) public data: CouponIf) {
  }
  ngOnInit() {
    this.reversGeo.getAddress(this.data.latitude, this.data.longitude).subscribe((adr :any) =>{
      console.log(JSON.stringify(adr))
      this.street = adr.address.road;
      this.housNumber = adr.address.house_number
      this.postCode = adr.address.postcode
      this.city = adr.address.city || adr.address.town || adr.address.village || adr.address.municipality;
    })

    var map = L.map('map').setView([this.data.latitude, this.data.longitude], 30);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 300,
      }).addTo(map);
    var marker = L.marker([this.data.latitude, this.data.longitude]).addTo(map);
   marker.on('click', () => {
      const googleMapsUrl = `https://www.google.com/maps?q=${this.data.latitude},${this.data.longitude}`;
      window.open(googleMapsUrl, '_blank');
    });
  }



}
