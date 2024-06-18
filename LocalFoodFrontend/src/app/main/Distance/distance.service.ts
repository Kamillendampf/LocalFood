import { Injectable } from '@angular/core';
import {CouponService} from "../CouponService/coupon.service";
import {CouponIf} from "../CouponInterface";

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

  getDistance(destinationPos : CouponIf,  currentPos : { latitude: number; longitude: number} ): CouponIf{


    destinationPos.distance = Math.sqrt(Math.pow(destinationPos.latitude - currentPos.latitude, 2) +
      Math.pow(destinationPos.longitude - currentPos.longitude, 2));
    return destinationPos
  }

}
