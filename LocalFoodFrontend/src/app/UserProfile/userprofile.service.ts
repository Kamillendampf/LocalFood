import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private name : string = ""
  private email : string  = ""
  private userType : boolean = false
  private userIdentKey : string | undefined = ""

  set setUserIdentKey( userIdentKey : string){
   this.userIdentKey = userIdentKey
    this.setRememberMe()
  }
  set setUserName( username : string){
    this.name = username
  }

  set setUserEmail( email : string){
    this.email = email
  }

  set setIdentKey(userIdentKey : string){
    this.userIdentKey = userIdentKey
  }

  get getUserName() : string{
    return this.name
  }

  get getUserEmail() : string{
    return this.email
  }

  get getIdentKey() : string | undefined{
    return this.userIdentKey
  }

  setRememberMe(){
    sessionStorage.setItem("key", <string>this.userIdentKey)
  }

  getRememberMe(){
    this.userIdentKey = sessionStorage.getItem("key")?.toString()
  }
}
