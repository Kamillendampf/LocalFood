import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AddCoponentService {

  constructor(private http: HttpClient) { }
  public addCopon(latitude : number, longitude : number, kategorie : string, artikelart : string, name : string, beschreibung : string): Observable<JSON>{
    const body: {latitude : number, longitude : number, kategorie : string, artikelart : string, name : string, beschreibung : string } =
      {"latitude": latitude, "longitude" : longitude, "kategorie" : kategorie, "artikelart": artikelart, "name" : name, "beschreibung" : beschreibung}
    return this.http.post<JSON>('http://'+environment.apiUrl + '/login', body).pipe((response => response))
  }
}
