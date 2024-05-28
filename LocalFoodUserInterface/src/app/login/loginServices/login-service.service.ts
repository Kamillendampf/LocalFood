import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment} from "../../../environment/environment";


@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {

  private apiUrl : string = environment.apiUrl
  constructor(private http: HttpClient) { }

  public loginRequest(data: string): Observable<JSON> {
    console.log(environment.apiUrl)
    const body: { UserIdentificationKey: string } = {"UserIdentificationKey": data}
    return this.http.post<JSON>(this.apiUrl + '/login', body).pipe(response => response)
  }
}
