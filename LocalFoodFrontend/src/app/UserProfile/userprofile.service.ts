import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private name : string = ""
  private email : string  = ""
  private progileType : boolean = false
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

  set setProfileType(profileType : boolean){
    this.progileType = profileType
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

  get getProfileType(){
    return this.progileType
  }

  setRememberMe(){
    localStorage.setItem("key", <string>this.userIdentKey)
  }

  getRememberMe(){
    this.userIdentKey = localStorage.getItem("key")?.toString()
  }
}
