import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddDestinationComponent } from './admin/add-destination/add-destination.component';
import { DestFormComponent } from './admin/dest-form/dest-form.component';

import {MatMenuModule} from '@angular/material/menu';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PkgViewComponent } from './majorproject/pakages/pkg-view/pkg-view.component';
import { PkgBookingComponent } from './majorproject/pakages/pkg-booking/pkg-booking.component';
import { HotelBookingComponent } from './majorproject/hotel/hotel-booking/hotel-booking.component';
import { HotelViewComponent } from './majorproject/hotel/hotel-view/hotel-view.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminHomeComponent } from './admin/majorProject/admin-home/admin-home.component';
import { AddPackageComponent } from './admin/majorProject/add-package/add-package.component';
import { AddHotelComponent } from './admin/majorProject/add-hotel/add-hotel.component';
import { ViewHotelTabelComponent } from './admin/majorProject/view-hotel-tabel/view-hotel-tabel.component';
import { RoomDetailsComponent } from './admin/majorProject/room-details/room-details.component';
import { AddRoomComponent } from './admin/majorProject/add-room/add-room.component';

import {MatCardModule} from '@angular/material/card';
import { ViewPackageTableComponent } from './admin/majorProject/view-package-table/view-package-table.component';
import { AddActivityComponent } from './admin/majorProject/add-activity/add-activity.component';
import { ActivityDetailsComponent } from './admin/majorProject/activity-details/activity-details.component';

import { HotelViewMoreComponent } from './majorproject/hotel/hotel-view-more/hotel-view-more.component';
import { PkgViewMoreComponent } from './majorproject/pakages/pkg-view-more/pkg-view-more.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    LoginComponent,
    SignupComponent,
    AddDestinationComponent,
    DestFormComponent,
    RestPasswordComponent,
    ChangePassComponent,
    PkgViewComponent,
    PkgBookingComponent,
    HotelBookingComponent,
    HotelViewComponent,
    UserDashboardComponent,
    AdminHomeComponent,
    AddPackageComponent,
    AddHotelComponent,
    ViewHotelTabelComponent,

    RoomDetailsComponent,
    AddRoomComponent,

    ViewPackageTableComponent,
    AddActivityComponent,
    ActivityDetailsComponent,
    HotelViewMoreComponent,
    PkgViewMoreComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatStepperModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
