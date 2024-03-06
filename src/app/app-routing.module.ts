import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Login & SignUp & user Dashboard
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

// Destination
import { DestinationComponent } from './destination/destination.component';
import { AddDestinationComponent } from './admin/add-destination/add-destination.component';

// admin
import { AdminHomeComponent } from './admin/majorProject/admin-home/admin-home.component';
import { AddPackageComponent } from './admin/majorProject/add-package/add-package.component';
import { AddHotelComponent } from './admin/majorProject/add-hotel/add-hotel.component';
import { ViewHotelTabelComponent } from './admin/majorProject/view-hotel-tabel/view-hotel-tabel.component';
import { RoomDetailsComponent } from './admin/majorProject/room-details/room-details.component';
import { ViewPackageTableComponent } from './admin/majorProject/view-package-table/view-package-table.component';
import { ActivityDetailsComponent } from './admin/majorProject/activity-details/activity-details.component';

// user
import { PkgViewComponent } from './majorproject/pakages/pkg-view/pkg-view.component';
import { PkgBookingComponent } from './majorproject/pakages/pkg-booking/pkg-booking.component';
import { PkgViewMoreComponent } from './majorproject/pakages/pkg-view-more/pkg-view-more.component';
import { HotelViewComponent } from './majorproject/hotel/hotel-view/hotel-view.component';
import { HotelBookingComponent } from './majorproject/hotel/hotel-booking/hotel-booking.component';
import { HotelViewMoreComponent } from './majorproject/hotel/hotel-view-more/hotel-view-more.component';




const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: 'home/:scrollTo', component: HomeComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  
  // login & signup
  { path : 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path: 'resetPass', component:RestPasswordComponent},
  { path: 'changePass', component:ChangePassComponent},

  // user dashboard
  { path:'userDashboard', component:UserDashboardComponent},

  // admin pages
  { path:'adminHome', component:AdminHomeComponent},
  { path:'adminHome/addDestination', component:AddDestinationComponent},
  { path:'adminHome/viewPackage', component:ViewPackageTableComponent},
  { path:'adminHome/viewHotel', component:ViewHotelTabelComponent},
  { path:'viewHotel',component:ViewHotelTabelComponent},
  { path:'viewPackage',component:ViewPackageTableComponent},
  { path:'adminHome/viewPackage/viewActivity',component:ActivityDetailsComponent},
  { path:'activity/getActivityListByPackageId/:packageId', component:ActivityDetailsComponent},

  { path:'addHotel', component:AddHotelComponent},
  { path:'addPackage', component:AddPackageComponent},

  // user pages
  { path : 'destination', component: DestinationComponent},
  { path:'pakageView', component:PkgViewComponent},
  { path:'pakageView/pakageViewMore', component:PkgViewMoreComponent},
  { path:'activity/getActivityCardsByPackageId/:packageId', component:PkgViewMoreComponent},
  { path:'hotelView', component:HotelViewComponent},
  { path:'hotelView/getRoomByHotelId/:hotelId', component:HotelViewMoreComponent},
 
  // booking pages
  { path:'hotelBooking', component:HotelBookingComponent},
  { path:'hotelBooking/:hotelId', component:HotelBookingComponent},
  { path:'packageBooking',component:PkgBookingComponent},
  { path:'packageBooking/:packageId', component:PkgBookingComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
