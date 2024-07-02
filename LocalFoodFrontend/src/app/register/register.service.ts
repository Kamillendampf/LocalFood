import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

registerUser(identKey: string, name : string, email : string, profileType : boolean): Observable<JSON>{
    console.log("Die Anfrage Register wurde aufgerufen")
  const body: { profileType: boolean, name : string, email : string, identKey: string } = {"profileType" : profileType, "name" : name, "email" : email, "identKey": identKey}
  return this.http.post<JSON>('http://'+environment.apiUrl + '/register', body).pipe((response => response))
  }

}
