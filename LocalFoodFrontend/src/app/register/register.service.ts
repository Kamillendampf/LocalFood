import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl : String = environment.apiUrl
  constructor(private http : HttpClient) { }

registerUser(identKey: string, company : boolean): Observable<JSON>{
    console.log("Die Anfrage Register wurde aufgerufen")
  const body: { company: boolean, UserIdentificationKey: string } = {"company" : company, "UserIdentificationKey": identKey}
  return this.http.post<JSON>('http://'+this.apiUrl + '/register', body).pipe((response => response))
  }

}
