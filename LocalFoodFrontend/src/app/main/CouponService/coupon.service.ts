import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  getAllCoupons() {
      return this.http.get<JSON>('http://'+environment.apiUrl + '/getAllCoupons')
        .pipe((response => response))
  }
}
