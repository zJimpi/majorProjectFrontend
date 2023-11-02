import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddDestinationComponent } from './admin/add-destination/add-destination.component';
import { MajorprojectComponent } from './majorproject/majorproject.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: 'home/:scrollTo', component: HomeComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'destination', component: DestinationComponent},
  { path : 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path:'admin/addDestination', component:AddDestinationComponent},
  { path: 'majorProject', component:MajorprojectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
