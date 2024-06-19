import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environment/environment";
import {UserprofileService} from "../../UserProfile/userprofile.service";
import {ReversGeodecoderService} from "../../main/reversGeodecoder/revers-geodecoder.service";

@Injectable({
  providedIn: 'root'
})
export class AddCoponentService {

  constructor(private http: HttpClient, private user: UserprofileService, private reversGeo: ReversGeodecoderService) {
  }

  public addCopon(latitude: number,
                  longitude: number,
                  kategorie: string,
                  artikelart: string,
                  name: string,
                  beschreibung: string,
                  abholzeit: string,
                  preis: number): Observable<JSON> {

    this.reversGeo.getAddress(latitude, longitude).subscribe()

    const body: {
      identKey: string,
      username: string,
      latitude: number,
      longitude: number,
      kategorie: string,
      artikelart: string,
      name: string,
      beschreibung: string,
      abholzeit: string,
      preis: number
    } =
      {
        "identKey": this.user.getIdentKey?.toString() == undefined ? "" : this.user.getIdentKey.toString(),
        "username": this.user.getUserName,
        "latitude": latitude,
        "longitude": longitude,
        "kategorie": kategorie,
        "artikelart": artikelart,
        "name": name,
        "beschreibung": beschreibung,
        "abholzeit": abholzeit,
        "preis" : preis,
      }

    const headers = new HttpHeaders().set('Authorization', this.user.getIdentKey?.toString() == undefined ? "" : this.user.getIdentKey.toString())
    const headerOptions = {
      headers
    }

    return this.http.post<JSON>('http://' + environment.apiUrl + '/addCoupon', body, headerOptions).pipe((response => response))
  }
}
