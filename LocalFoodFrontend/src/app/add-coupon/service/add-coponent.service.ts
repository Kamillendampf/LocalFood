import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment} from "../../../../environment/environment";
import {UserprofileService} from "../../UserProfile/userprofile.service";

@Injectable({
  providedIn: 'root'
})
export class AddCoponentService {

  constructor(private http: HttpClient, private user : UserprofileService) { }
  public addCopon(latitude : number, longitude : number, kategorie : string, artikelart : string, name : string, beschreibung : string): Observable<JSON>{

    const body: {identKey: string, latitude : number, longitude : number, kategorie : string, artikelart : string, name : string, beschreibung : string } =
      {"identKey": this.user.getIdentKey?.toString() == undefined? "" : this.user.getIdentKey.toString(),
        "latitude": latitude, "longitude" : longitude, "kategorie" : kategorie, "artikelart": artikelart,
        "name" : name, "beschreibung" : beschreibung}

    const headers = new HttpHeaders().set('Authorization', this.user.getIdentKey?.toString() == undefined? "" : this.user.getIdentKey.toString())
    const headerOptions = {
      headers
    }

      return this.http.post<JSON>('http://'+environment.apiUrl + '/addCoupon', body, headerOptions).pipe((response => response))
  }
}
