import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';
import { ImageComponent } from './image/image.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddDestinationComponent } from './admin/add-destination/add-destination.component';
import { AddImageComponent } from './admin/add-image/add-image.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: 'home/:scrollTo', component: HomeComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'destination', component: DestinationComponent},
  { path: 'image', component:ImageComponent},
  { path : 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path:'admin', component:AdminHomeComponent},
  { path:'admin/addDestination', component:AddDestinationComponent},
  { path: 'admin/addImage', component:AddImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }