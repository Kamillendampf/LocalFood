import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor() { }

  private isOnBooking : boolean = false
  private isNav : boolean = true

  set isBooking(isOnBooking : boolean){
    this.isOnBooking = isOnBooking
  }

  get isBooking() : boolean{
    return this.isOnBooking
  }

  set isNavOn( isNavOn : boolean){
    this.isNav = isNavOn
  }

  get isNavOn() : boolean{
   return this.isNav
  }
}
