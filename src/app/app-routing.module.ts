import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddDestinationComponent } from './admin/add-destination/add-destination.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PkgViewComponent } from './majorproject/pakages/pkg-view/pkg-view.component';
import { PkgBookingComponent } from './majorproject/pakages/pkg-booking/pkg-booking.component';
import { HotelViewComponent } from './majorproject/hotel/hotel-view/hotel-view.component';
import { HotelBookingComponent } from './majorproject/hotel/hotel-booking/hotel-booking.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: 'home/:scrollTo', component: HomeComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'destination', component: DestinationComponent},
  { path : 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path: 'resetPass', component:RestPasswordComponent},
  { path: 'changePass', component:ChangePassComponent},
  { path:'admin/addDestination', component:AddDestinationComponent},
  { path:'pakageView', component:PkgViewComponent},
  { path:'pakgesBooking', component:PkgBookingComponent},
  { path:'hotelView', component:HotelViewComponent},
  { path:'hotelBooking', component:HotelBookingComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
