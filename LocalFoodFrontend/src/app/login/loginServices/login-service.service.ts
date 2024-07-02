import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment} from "../../../../environment/environment";


@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }



  public loginRequest(identKey: string): Observable<JSON>{
    console.log("Die Anfrage Register wurde aufgerufen")
    const body: {identKey: string } = {"identKey": identKey}
    return this.http.post<JSON>('http://'+environment.apiUrl + '/login', body).pipe((response => response))
  }
}
