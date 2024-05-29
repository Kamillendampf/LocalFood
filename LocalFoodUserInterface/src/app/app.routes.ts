import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {ProfileComponent} from "./profile/profile.component";
import {CouponComponent} from "./coupon/coupon.component";

  export const routes: Routes = [{path: "login", component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: MainComponent},
    {path: 'profil', component: ProfileComponent},
    {path: 'coupon' , component: CouponComponent},
    {path: '',   redirectTo: '/login', pathMatch: 'full' },
  ];
