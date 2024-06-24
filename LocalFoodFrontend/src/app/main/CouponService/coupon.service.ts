import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environment/environment";
import {Observable} from "rxjs";
import {UserprofileService} from "../../UserProfile/userprofile.service";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient, private user : UserprofileService) { }

  addCoupons(couponId :number) : Observable<JSON>{
    const headers = new HttpHeaders().set('Authorization', this.user.getIdentKey?.toString()? this.user.getIdentKey: "")

    const headerOptions = {
      headers
    }
    const body: { identKey: string, couponId : number } = {"identKey" : this.user.getIdentKey != null? this.user.getIdentKey : "", "couponId" : couponId}
    return this.http.post<JSON>('http://'+environment.apiUrl + '/addMyCoupon', body, headerOptions).pipe((response => response))
  }

  getAllCoupons() : Observable<JSON> {
    const headers = new HttpHeaders().set('Authorization',  this.user.getIdentKey?.toString()? this.user.getIdentKey: "")

    const headerOptions = {
      headers
    }
      return this.http.get<JSON>('http://'+environment.apiUrl + '/getAllCoupons', headerOptions)
        .pipe((response => response))
  }

  getMyCoupons() : Observable<JSON> {
    console.log("Die Anfrage wurde verschickt")
    const headers = new HttpHeaders().set('Authorization',  this.user.getIdentKey?.toString()? this.user.getIdentKey: "")

    const headerOptions = {
      headers
    }
    const body: { identKey: string} = {"identKey" :  this.user.getIdentKey != null? this.user.getIdentKey : ""}
    return this.http.post<JSON>('http://'+environment.apiUrl + '/getMyCoupons', body, headerOptions)
      .pipe((response => response))
  }

  deleteMyCoupon(id : number){
    console.log("Die Funktion wo das löschen an den server übergeben wird wurde aufgerufen.")
    const headers = new HttpHeaders().set('Authorization',  this.user.getIdentKey?.toString()? this.user.getIdentKey: "")

    const headerOptions = {
      headers
    }
    const body: { identKey: string, couponId : number } = {"identKey" : this.user.getIdentKey != null? this.user.getIdentKey : "", "couponId" : id}
    return this.http.post<JSON>('http://'+environment.apiUrl + '/deleteMyCoupons', body, headerOptions)
      .pipe((response => response))
  }
}
