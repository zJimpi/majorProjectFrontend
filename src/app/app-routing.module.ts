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
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminHomeComponent } from './admin/majorProject/admin-home/admin-home.component';
import { AddPackageComponent } from './admin/majorProject/add-package/add-package.component';
import { AddHotelComponent } from './admin/majorProject/add-hotel/add-hotel.component';
import { ViewHotelTabelComponent } from './admin/majorProject/view-hotel-tabel/view-hotel-tabel.component';
import { ViewPackageTableComponent } from './admin/majorProject/view-package-table/view-package-table.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: 'home/:scrollTo', component: HomeComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'destination', component: DestinationComponent},
  { path : 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path: 'resetPass', component:RestPasswordComponent},
  { path: 'changePass', component:ChangePassComponent},
  { path:'adminHome/addDestination', component:AddDestinationComponent},
  { path:'pakageView', component:PkgViewComponent},
  { path:'pakgesBooking', component:PkgBookingComponent},
  { path:'hotelView', component:HotelViewComponent},
  { path:'hotelBooking', component:HotelBookingComponent},
  { path:'userDashboard', component:UserDashboardComponent},
  { path:'adminHome', component:AdminHomeComponent},
  { path:'addPackage', component:AddPackageComponent},
  { path:'addHotel', component:AddHotelComponent},
  { path:'viewHotel',component:ViewHotelTabelComponent},
  { path:'viewPackage',component:ViewPackageTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
